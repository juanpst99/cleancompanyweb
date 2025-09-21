#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Colores para la consola
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
  blue: '\x1b[34m',
};

// Función para imprimir con color
const log = {
  info: (msg) => console.log(`${colors.cyan}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  header: (msg) => console.log(`\n${colors.bright}${colors.blue}${msg}${colors.reset}\n${'='.repeat(50)}`),
};

// Función para ejecutar comandos
const runCommand = (command, args = [], options = {}) => {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options,
    });

    proc.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`${command} exited with code ${code}`));
      } else {
        resolve();
      }
    });

    proc.on('error', reject);
  });
};

// Función principal
async function runLighthouse() {
  try {
    log.header('🚦 Lighthouse Performance Test');
    
    // Verificar si existe build
    const buildPath = path.join(process.cwd(), '.next');
    if (!fs.existsSync(buildPath)) {
      log.warning('No build found. Building application...');
      await runCommand('npm', ['run', 'build']);
      log.success('Build completed');
    } else {
      log.info('Using existing build');
    }

    // Ejecutar Lighthouse CI
    log.header('Running Lighthouse Tests');
    await runCommand('npx', ['lhci', 'autorun']);

    // Leer resultados si existen
    const resultsDir = path.join(process.cwd(), '.lighthouseci');
    if (fs.existsSync(resultsDir)) {
      const files = fs.readdirSync(resultsDir);
      const lhrFiles = files.filter(f => f.startsWith('lhr-') && f.endsWith('.json'));
      
      if (lhrFiles.length > 0) {
        log.header('📊 Results Summary');
        
        lhrFiles.forEach(file => {
          const lhr = JSON.parse(fs.readFileSync(path.join(resultsDir, file), 'utf8'));
          const url = new URL(lhr.finalUrl);
          
          console.log(`\n${colors.bright}${url.pathname}${colors.reset}`);
          console.log('-'.repeat(30));
          
          // Scores
          const scores = {
            'Performance': Math.round((lhr.categories.performance?.score || 0) * 100),
            'Accessibility': Math.round((lhr.categories.accessibility?.score || 0) * 100),
            'Best Practices': Math.round((lhr.categories['best-practices']?.score || 0) * 100),
            'SEO': Math.round((lhr.categories.seo?.score || 0) * 100),
          };
          
          Object.entries(scores).forEach(([category, score]) => {
            const color = score >= 90 ? colors.green : score >= 50 ? colors.yellow : colors.red;
            const emoji = score >= 90 ? '✅' : score >= 50 ? '⚠️' : '❌';
            console.log(`${emoji} ${category}: ${color}${score}%${colors.reset}`);
          });
          
          // Core Web Vitals
          console.log(`\n${colors.bright}Core Web Vitals:${colors.reset}`);
          const metrics = {
            'FCP': lhr.audits['first-contentful-paint']?.displayValue || 'N/A',
            'LCP': lhr.audits['largest-contentful-paint']?.displayValue || 'N/A',
            'CLS': lhr.audits['cumulative-layout-shift']?.displayValue || 'N/A',
            'TBT': lhr.audits['total-blocking-time']?.displayValue || 'N/A',
            'SI': lhr.audits['speed-index']?.displayValue || 'N/A',
          };
          
          Object.entries(metrics).forEach(([metric, value]) => {
            console.log(`  ${metric}: ${value}`);
          });
        });
        
        // Verificar si cumple con los criterios
        log.header('✅ Validation');
        const firstResult = JSON.parse(fs.readFileSync(path.join(resultsDir, lhrFiles[0]), 'utf8'));
        const performanceScore = Math.round((firstResult.categories.performance?.score || 0) * 100);
        
        if (performanceScore >= 85) {
          log.success(`Performance score ${performanceScore}% meets the minimum requirement (≥85%)`);
        } else {
          log.error(`Performance score ${performanceScore}% does not meet the minimum requirement (≥85%)`);
          
          // Mostrar oportunidades de mejora
          console.log(`\n${colors.bright}Top Opportunities:${colors.reset}`);
          const opportunities = firstResult.audits
            ? Object.values(firstResult.audits)
                .filter(audit => audit.score !== null && audit.score < 0.9 && audit.details?.type === 'opportunity')
                .sort((a, b) => (b.details?.overallSavingsMs || 0) - (a.details?.overallSavingsMs || 0))
                .slice(0, 5)
            : [];
          
          opportunities.forEach((opp, i) => {
            const savings = opp.details?.overallSavingsMs 
              ? `(${Math.round(opp.details.overallSavingsMs)}ms potential savings)` 
              : '';
            console.log(`${i + 1}. ${opp.title} ${colors.yellow}${savings}${colors.reset}`);
          });
        }
      }
    }

    log.header('✨ Test Complete');
    log.info('Full reports available in .lighthouseci/');
    
  } catch (error) {
    log.error(`Error: ${error.message}`);
    process.exit(1);
  }
}

// Ejecutar si es el script principal
if (require.main === module) {
  runLighthouse();
}

module.exports = { runLighthouse };