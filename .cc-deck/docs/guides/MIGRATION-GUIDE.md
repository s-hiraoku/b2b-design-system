# CC-Deck フォルダ構造移行ガイド

## 移行概要

CC-Deck Workflow Engine のユーザビリティ向上のため、フォルダ構造を最適化しました。

## 新しいフォルダ構造

### 変更前 (.cc-deck/旧構造)
```
.cc-deck/
├── workflows/           # ワークフロー定義
├── engine/             # エンジン設定  
├── DESIGN.md           # 設計文書
├── README.md           # ドキュメント
├── test-workflow.yaml  # テスト用ファイル
├── fix-agents.sh       # 一時スクリプト
└── (その他混在ファイル)
```

### 変更後 (.cc-deck/新構造)
```
.cc-deck/
├── config/             # 🔧 永続設定ファイル (バージョン管理対象)
│   ├── workflows/      # YAMLワークフロー定義
│   └── engine/         # エンジン設定・ドキュメント
├── runtime/            # 🏃 実行時動的ファイル (gitignore推奨)
│   ├── context/        # Smart Context状態管理
│   ├── sessions/       # セッション別実行履歴
│   ├── checkpoints/    # 実行チェックポイント
│   └── logs/           # 詳細実行ログ
├── templates/          # 📝 テンプレートファイル
│   ├── workflows/      # ワークフローテンプレート
│   └── configs/        # 設定テンプレート
└── docs/               # 📚 CC-Deck専用ドキュメント
    ├── design/         # 設計ドキュメント
    └── guides/         # 利用ガイド
```

## 移行された内容

### config/ - 永続設定ファイル
- `workflows/` ← 旧 `workflows/` (6つのメインワークフロー)
- `engine/` ← 旧 `engine/` (エンジン設定)

### runtime/ - 実行時動的ファイル  
- `context/` - Smart Context状態管理 (新規作成)
- `sessions/` - セッション別実行履歴 (新規作成)
- `checkpoints/` - 実行チェックポイント (新規作成)  
- `logs/` - 詳細実行ログ (新規作成)

### templates/ - テンプレートファイル
- `workflows/` ← 旧 `test-workflow.yaml`

### docs/ - CC-Deck専用ドキュメント
- `design/` ← 旧 `DESIGN.md`, `workflow-*.md`
- `guides/` - 利用ガイド (新規作成)
- ← 旧 `README.md`

## エージェント設定更新

### orchestrator.md パス更新
以下のパス参照を更新しました：

```diff
# ワークフロー定義パス
- .cc-deck/workflows/{workflow_name}.yaml
+ .cc-deck/config/workflows/{workflow_name}.yaml

# コンテキスト保存パス  
- .cc-deck/context/active/{workflow_id}.json
+ .cc-deck/runtime/context/{workflow_id}.json

# チェックポイントパス
- .cc-deck/checkpoints/{workflow_id}-{checkpoint}.json  
+ .cc-deck/runtime/checkpoints/{workflow_id}-{checkpoint}.json
```

## gitignore設定

`.cc-deck/.gitignore` を追加し、実行時ファイルを除外：

```gitignore
# Runtime execution files
runtime/context/*
runtime/sessions/*  
runtime/checkpoints/*
runtime/logs/*

# Temporary files
*.tmp
*.temp
*.log
```

## エージェント対応状況

✅ **完了**: 
- orchestrator.md - パス参照更新済み
- ワークフローファイル - config/workflows/ 移動済み

⚠️ **要確認**:
他のエージェントで `.cc-deck/workflows` パス参照がある場合は個別更新が必要

## ユーザーへの影響

### ✅ プラス効果
- **明確な分離**: 永続ファイルと実行時ファイルが一目で識別可能
- **保守性向上**: 設定ファイルとログファイルが混在しない
- **バックアップ容易**: config/ のみバックアップ対象として明確
- **クリーンアップ簡単**: runtime/ の定期削除で容量管理

### ⚠️ 注意点
- 既存のカスタムエージェントでパス参照がハードコードされている場合は要更新
- 実行中のワークフローは影響なし (パス解決は実行時)

## 今後の開発指針

### 新ファイル作成ルール
- **設定・定義ファイル** → `config/` 配下
- **実行時生成ファイル** → `runtime/` 配下  
- **テンプレート** → `templates/` 配下
- **ドキュメント** → `docs/` 配下

### エージェント開発ガイドライン
- Smart Context使用時は `runtime/context/` を参照
- ワークフロー定義読み込みは `config/workflows/` を参照
- チェックポイント作成は `runtime/checkpoints/` を使用
- 詳細ログ出力は `runtime/logs/` を使用

## トラブルシューティング

### Q: 既存ワークフローが動作しない
A: パス参照が旧構造のままの可能性があります。エージェント設定を確認してください。

### Q: 実行時ファイルが見つからない
A: `runtime/` ディレクトリが作成されているか確認し、必要に応じて手動作成してください。

### Q: gitignoreが効かない
A: `.cc-deck/.gitignore` ファイルが正しく配置されているか確認してください。