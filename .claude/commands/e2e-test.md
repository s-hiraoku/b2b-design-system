# E2E Test Command

## Usage
```bash
/e2e-test <project-name> [options]
```

## Description
Minimal end-to-end testing command that generates basic E2E test scenarios and provides framework setup guidance.

## Examples

### Basic E2E Test Generation
```bash
/e2e-test user-auth-system
# → .kiro/specs/user-auth-system/ の仕様を解析
# → 基本的なE2Eテストシナリオを生成
# → Playwright/Cypressセットアップ指示を提供
```

### Specific User Journey
```bash
/e2e-test checkout-flow --journey "user registration to purchase"
# → チェックアウトフローのE2Eテストを生成
# → ユーザー登録から購入までのシナリオ
```

## Options
- `--framework <playwright|cypress>`: テストフレームワークを指定
- `--journey <description>`: 特定のユーザージャーニーに焦点
- `--browser <chrome|firefox|safari>`: テストブラウザを指定

## Test Coverage
- ユーザー認証フロー
- 主要機能のユーザージャーニー
- フォーム入力とバリデーション
- ナビゲーションとページ遷移

## Output
- 基本的なE2Eテストファイル生成
- テストフレームワークセットアップ指示
- 実行コマンドとCI/CD統合ガイド

## Limitations
- 複雑なインタラクションは手動調整が必要
- 視覚的テストは含まれない
- 基本的なシナリオのみ生成

## Implementation
このコマンドは `E2E Test` エージェントを呼び出し、最小限のサブエージェントで基本的なE2Eテスト生成を行います。