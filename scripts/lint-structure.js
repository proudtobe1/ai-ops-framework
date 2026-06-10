const fs = require('fs');
const path = require('path');

// Define required directories and files for the AI-Ops Framework
const REQUIRED_STRUCTURE = {
    directories: [
        '.github',
        '.github/workflows',
        '.github/ISSUE_TEMPLATE',
        'systems/schema',
        'docs'
    ],
    files: [
        '.github/workflows/ci.yml',
        '.github/workflows/docs-autobuild.yml',
        '.github/workflows/manifest-validation.yml',
        '.github/workflows/structural-linter.yml',
        '.github/ISSUE_TEMPLATE/config.yml',
        '.github/ISSUE_TEMPLATE/bug_report.yml',
        '.github/ISSUE_TEMPLATE/feature_request.yml',
        '.github/PULL_REQUEST_TEMPLATE.md',
        'mkdocs.yml'
    ]
};

let errors = 0;

console.log('🔍 Starting Structural Integrity Linting...\n');

// Verify Directories
REQUIRED_STRUCTURE.directories.forEach(dir => {
    const targetPath = path.join(process.cwd(), dir);
    if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isDirectory()) {
        console.error(`❌ Missing required directory: ${dir}`);
        errors++;
    } else {
        console.log(`✅ Directory exists: ${dir}`);
    }
});

// Verify Files
REQUIRED_STRUCTURE.files.forEach(file => {
    const targetPath = path.join(process.cwd(), file);
    if (!fs.existsSync(targetPath) || !fs.statSync(targetPath).isFile()) {
        console.error(`❌ Missing required file: ${file}`);
        errors++;
    } else {
        console.log(`✅ File exists: ${file}`);
    }
});

console.log('\n-----------------------------------');
if (errors > 0) {
    console.error(`💥 Structural validation failed with ${errors} error(s).`);
    process.exit(1);
} else {
    console.log('🎉 Structural integrity checks passed successfully!');
    process.exit(0);
}
