# Project Structure

## Root Directory Organization
```
todo-app/
├── src/                 # アプリケーションソースコード
├── public/              # 静的ファイル
├── tests/               # テストファイル
├── .kiro/               # Kiro SDD configuration
├── package.json         # 依存関係とスクリプト
├── tsconfig.json        # TypeScript設定
├── vite.config.ts       # Vite設定
├── vitest.config.ts     # テスト設定
└── README.md            # プロジェクトドキュメント
```

## Source Code Structure (`src/`)
```
src/
├── components/          # React コンポーネント
│   ├── TodoApp.tsx      # メインアプリケーションコンポーネント
│   ├── TodoList.tsx     # タスク一覧コンポーネント
│   ├── TodoItem.tsx     # 個別タスクコンポーネント
│   ├── TodoForm.tsx     # タスク追加フォーム
│   └── TodoFilter.tsx   # フィルタリングコンポーネント
├── hooks/               # カスタムHooks
│   ├── useTodos.ts      # タスク管理ロジック
│   ├── useLocalStorage.ts # LocalStorage操作
│   └── useFilter.ts     # フィルタリング状態管理
├── types/               # TypeScript型定義
│   ├── index.ts         # 基本型定義（Todo, FilterType等）
│   └── storage.ts       # ストレージ関連型定義
├── utils/               # ユーティリティ関数
│   ├── storage.ts       # LocalStorage操作ヘルパー
│   ├── validation.ts    # データ検証関数
│   └── constants.ts     # 定数定義
├── styles/              # スタイルファイル
│   ├── index.css        # グローバルスタイル
│   ├── components/      # コンポーネント別スタイル
│   └── variables.css    # CSS変数定義
├── App.tsx              # ルートコンポーネント
├── main.tsx             # アプリケーションエントリーポイント
└── vite-env.d.ts        # Vite型定義
```

## Test Structure (`tests/`)
```
tests/
├── components/          # コンポーネントテスト
│   ├── TodoApp.test.tsx
│   ├── TodoList.test.tsx
│   ├── TodoItem.test.tsx
│   ├── TodoForm.test.tsx
│   └── TodoFilter.test.tsx
├── hooks/               # カスタムHooksテスト
│   ├── useTodos.test.ts
│   ├── useLocalStorage.test.ts
│   └── useFilter.test.ts
├── utils/               # ユーティリティ関数テスト
│   ├── storage.test.ts
│   └── validation.test.ts
├── setup.ts             # テストセットアップ
└── __mocks__/           # モック定義
```

## Code Organization Patterns

### Data Models
```typescript
// types/index.ts
export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export type FilterType = 'all' | 'active' | 'completed';

export interface TodoState {
  todos: Todo[];
  filter: FilterType;
}
```

### Custom Hooks パターン
```typescript
// hooks/useTodos.ts
export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  const addTodo = (text: string) => {
    // タスク追加ロジック
  };
  
  const toggleTodo = (id: string) => {
    // 完了状態切り替えロジック
  };
  
  return { todos, addTodo, toggleTodo, ... };
};
```

### Component パターン
```typescript
// components/TodoItem.tsx
interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, text: string) => void;
}

export const TodoItem: React.FC<TodoItemProps> = ({ ... }) => {
  // コンポーネント実装
};
```

## File Naming Conventions
- **Components**: PascalCase (例: `TodoItem.tsx`)
- **Hooks**: camelCase with "use" prefix (例: `useTodos.ts`)
- **Utilities**: camelCase (例: `storage.ts`)
- **Types**: camelCase (例: `index.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (例: `MAX_TODO_LENGTH`)

## Import Organization
```typescript
// 1. React関連
import React, { useState, useEffect } from 'react';

// 2. 外部ライブラリ
import { v4 as uuidv4 } from 'uuid';

// 3. 内部モジュール（絶対パス）
import { Todo, FilterType } from '@/types';
import { useTodos } from '@/hooks/useTodos';

// 4. 相対パス
import './TodoApp.css';
```

## Key Architectural Principles

### Single Responsibility Principle
- **各コンポーネント**: 単一の責任を持つ
- **カスタムHooks**: 特定のロジックのみを管理
- **ユーティリティ関数**: 再利用可能な純粋関数

### Composition over Inheritance
- **React Hooks**: 状態ロジックの合成
- **Component composition**: Props経由でのデータ・ハンドラー受け渡し
- **Higher-order patterns**: render propsやcompound components

### Type Safety First
- **strict TypeScript**: null/undefined安全性
- **Interface-driven development**: 型定義ファーストの開発
- **Runtime validation**: 外部データ（LocalStorage）の検証

### Testability
- **Pure functions**: 副作用のない関数の優先
- **Dependency injection**: テスタブルなコンポーネント設計
- **Mock-friendly**: 外部依存関係の抽象化

### Performance Optimization
- **React.memo**: 不要な再レンダリング防止
- **useMemo/useCallback**: 計算コストとイベントハンドラーの最適化
- **Lazy loading**: 必要に応じたコンポーネント分割

### Accessibility
- **Semantic HTML**: 意味のあるHTML要素の使用
- **ARIA attributes**: スクリーンリーダー対応
- **Keyboard navigation**: キーボードアクセシビリティ