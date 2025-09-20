// eslint.config.js
// 목적: ESLint(문법/품질) + Prettier(포맷) 병행 사용
// 포인트: eslint-config-prettier를 마지막에 넣어 스타일 충돌 제거, 그리고 필요한 규칙 재활성화

import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import eslintConfigPrettier from 'eslint-config-prettier';
import unusedImports from 'eslint-plugin-unused-imports';

export default tseslint.config([
  globalIgnores(['dist', 'node_modules']),
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      react,
      'unused-imports': unusedImports,
    },
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      // ⬇️ Prettier와 충돌나는 ESLint 스타일 룰 OFF (항상 마지막)
      eslintConfigPrettier,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    settings: { react: { version: 'detect' } },
    rules: {
      /* --- 현대 JS 습관 --- */
      'no-var': 'error', // var 금지
      'prefer-const': ['warn', { destructuring: 'all' }],
      'object-shorthand': ['warn', 'always'],
      'prefer-template': 'warn', // + 연산자 대신 템플릿 리터럴
      'arrow-body-style': ['error', 'as-needed'], // 불필요한 { return } 제거
      '@typescript-eslint/no-explicit-any': 'warn',

      // /* --- TS 모범 사례 --- */
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // '@typescript-eslint/prefer-nullish-coalescing': 'warn',
      // '@typescript-eslint/prefer-optional-chain': 'warn',
      // '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

      /* --- 미사용 import/변수 정리 --- */
      'unused-imports/no-unused-imports': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],

      /* 개발 편의 (Vite Fast Refresh 안정성) */
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],

      /* --- 화살표 함수 중심 --- */
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'prefer-arrow-callback': ['error'],
    },
  },
]);
