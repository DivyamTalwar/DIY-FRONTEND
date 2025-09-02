// Script to fix all pages with proper alignment
import fs from 'fs';
import path from 'path';

const pagesDir = path.join(process.cwd(), 'src', 'pages');

const wrapperStyle = `
  style={{
    width: '100%',
    minHeight: '100vh',
    background: '#f8f9fa',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  }}
`;

const contentStyle = `
  style={{
    width: '100%',
    maxWidth: '1400px',
    margin: '0 auto',
    padding: '24px',
    boxSizing: 'border-box'
  }}
`;

// This script will fix alignment issues
console.log('Fixing alignment issues in all pages...');