# Git Submodule Management Guide

## 概要

このドキュメントでは、CC-Deckプロジェクトにおける**Git Submodule**を使用した独立プロジェクト管理について説明します。

### 実装例
- **親プロジェクト**: `cc-deck` 
- **サブモジュール**: `liquid-glass-tech-blog` (独立したGitHubリポジトリ)

## サブモジュールとは

Git Submoduleは、**別のGitリポジトリを親リポジトリの一部として組み込む仕組み**です。

### アーキテクチャ

```
cc-deck/ (親リポジトリ)
├── .gitmodules                    # サブモジュール設定ファイル
├── projects/
│   └── liquid-glass-tech-blog/    # サブモジュール（独立リポジトリ）
├── docs/
├── .kiro/
└── その他のファイル
```

### 特徴

1. **完全な独立性**: サブモジュールは独自のGitリポジトリ
2. **特定コミット参照**: 親は子の特定コミットを参照
3. **個別デプロイ**: サブモジュールを独立してデプロイ可能
4. **統合開発**: 親プロジェクト内からサブモジュールの開発が可能

## 初期セットアップ

### 既存プロジェクトをサブモジュール化する手順

#### 1. GitHubリポジトリの作成

```bash
# GitHubで新しいリポジトリを作成
# 例: https://github.com/username/project-name.git
```

#### 2. ローカルプロジェクトにリモートを追加

```bash
cd projects/your-project
git remote add origin https://github.com/username/project-name.git
git push -u origin main
```

#### 3. 親プロジェクトでサブモジュール設定

```bash
cd /path/to/parent-project

# .gitmodulesファイルを作成/編集
cat > .gitmodules << EOF
[submodule "projects/your-project"]
    path = projects/your-project
    url = https://github.com/username/project-name.git
EOF

# サブモジュール設定を同期
git submodule sync projects/your-project
git submodule init projects/your-project

# 変更をコミット
git add .gitmodules
git commit -m "Add submodule configuration for your-project"
```

#### 4. リモートHEAD設定

```bash
cd projects/your-project
git remote set-head origin main
```

## 日常的な開発ワークフロー

### サブモジュール内での開発

#### 基本的な開発フロー

```bash
# サブモジュールディレクトリに移動
cd projects/liquid-glass-tech-blog

# ファイルの編集・追加・削除
# 開発作業...

# 変更をステージング
git add .

# コミット
git commit -m "新機能を追加: ユーザー認証システム"

# GitHubにプッシュ
git push origin main
```

#### ブランチでの開発

```bash
# 新しいブランチを作成
git checkout -b feature/user-authentication

# 開発作業...
git add .
git commit -m "ユーザー認証機能の実装"

# GitHubにプッシュ
git push origin feature/user-authentication

# プルリクエスト作成後、マージされたらmainに戻る
git checkout main
git pull origin main
```

### 親プロジェクトでの更新反映

#### サブモジュール変更の反映

```bash
# 親プロジェクトディレクトリに移動
cd /Volumes/SSD/development/cc-deck

# サブモジュールの参照を更新
git add projects/liquid-glass-tech-blog

# 親プロジェクトでコミット
git commit -m "liquid-glass-tech-blogを最新版に更新

- 新機能: ユーザー認証システム
- バグ修正: レスポンシブデザインの問題
- パフォーマンス改善: 画像読み込み最適化"

# 必要に応じてプッシュ
git push origin main
```

## 運用コマンド集

### 状態確認

```bash
# サブモジュールの状態確認
git submodule status

# サブモジュール内の変更確認
cd projects/liquid-glass-tech-blog
git status
git log --oneline -5
```

### 更新操作

```bash
# サブモジュールを最新に更新
git submodule update --remote projects/liquid-glass-tech-blog

# 全サブモジュールを更新
git submodule update --remote --recursive

# サブモジュール設定の同期
git submodule sync
```

### クローン時の操作

```bash
# 親プロジェクトをクローン（サブモジュール含む）
git clone --recursive https://github.com/username/parent-project.git

# 既存クローンでサブモジュールを初期化
git submodule init
git submodule update
```

## ファイル管理

### .gitmodulesファイル

```ini
[submodule "projects/liquid-glass-tech-blog"]
    path = projects/liquid-glass-tech-blog
    url = https://github.com/s-hiraoku/liquid-glass-tech-blog.git
```

### .gitignoreの扱い

- **サブモジュール内**: 独自の`.gitignore`を管理
- **親プロジェクト**: サブモジュール全体は除外しない

```bash
# 親プロジェクトの.gitignore例
# サブモジュールの生成ファイルのみ除外
projects/*/node_modules/
projects/*/.next/
projects/*/dist/
```

## トラブルシューティング

### よくある問題と解決方法

#### 問題1: "fatal: Pathspec is in submodule"

```bash
# 原因: 親プロジェクトでサブモジュール内ファイルを操作しようとした
# 解決: サブモジュールディレクトリ内で操作

cd projects/liquid-glass-tech-blog
git add .
git commit -m "修正"
```

#### 問題2: "no submodule mapping found in .gitmodules"

```bash
# 原因: .gitmodulesファイルが破損または不整合
# 解決: .gitmodulesファイルを修正後

git submodule sync
git submodule init
```

#### 問題3: "Unable to find refs/remotes/origin/HEAD"

```bash
# 原因: リモートHEADが設定されていない
# 解決:

cd projects/your-submodule
git remote set-head origin main
```

#### 問題4: Detached HEAD状態

```bash
# 原因: サブモジュールが特定コミットを参照している
# 解決: 適切なブランチにチェックアウト

git checkout main
git pull origin main
```

### デバッグコマンド

```bash
# サブモジュール設定の詳細確認
git config --list | grep submodule

# リモート設定確認
git remote -v

# ブランチ状態確認
git branch -a

# 最近のコミット確認
git log --oneline --graph -10
```

## ベストプラクティス

### 開発時の注意点

1. **定期的な同期**
   ```bash
   # 毎日の作業開始時
   cd projects/your-project
   git pull origin main
   ```

2. **明確なコミットメッセージ**
   ```bash
   git commit -m "機能追加: ユーザープロファイル管理
   
   - 新規登録フォーム実装
   - プロフィール編集機能
   - アバター画像アップロード"
   ```

3. **親プロジェクトでの更新説明**
   ```bash
   git commit -m "サブモジュール更新: liquid-glass-tech-blog v2.1.0
   
   主な変更:
   - ユーザー認証システム追加
   - パフォーマンス改善
   - バグ修正"
   ```

### 推奨ワークフロー

#### 日常開発

1. **朝の準備**
   ```bash
   cd projects/liquid-glass-tech-blog
   git pull origin main
   ```

2. **開発作業**
   ```bash
   # ブランチ作成（必要に応じて）
   git checkout -b feature/new-feature
   
   # 開発・テスト
   # ...
   
   # コミット
   git add .
   git commit -m "詳細な変更内容"
   ```

3. **終日の整理**
   ```bash
   # プッシュ
   git push origin feature/new-feature
   
   # 親プロジェクトで更新
   cd /Volumes/SSD/development/cc-deck
   git add projects/liquid-glass-tech-blog
   git commit -m "サブモジュール更新"
   ```

#### リリース時

1. **サブモジュールでタグ作成**
   ```bash
   cd projects/liquid-glass-tech-blog
   git tag -a v1.0.0 -m "リリース v1.0.0"
   git push origin v1.0.0
   ```

2. **親プロジェクトで特定タグを参照**
   ```bash
   cd projects/liquid-glass-tech-blog
   git checkout v1.0.0
   cd /Volumes/SSD/development/cc-deck
   git add projects/liquid-glass-tech-blog
   git commit -m "リリース: liquid-glass-tech-blog v1.0.0"
   ```

## 自動化スクリプト例

### サブモジュール更新スクリプト

```bash
#!/bin/bash
# update-submodule.sh

set -e

SUBMODULE_PATH="projects/liquid-glass-tech-blog"
PARENT_DIR="/Volumes/SSD/development/cc-deck"

echo "🔄 サブモジュール更新開始..."

# サブモジュール内での操作
cd "$PARENT_DIR/$SUBMODULE_PATH"

# 最新版を取得
git pull origin main

# 親プロジェクトで更新を反映
cd "$PARENT_DIR"

# 変更があるかチェック
if git diff --quiet HEAD -- "$SUBMODULE_PATH"; then
    echo "✅ 更新なし"
else
    echo "📝 サブモジュール更新をコミット"
    git add "$SUBMODULE_PATH"
    git commit -m "Update $SUBMODULE_PATH to latest version"
    echo "✅ 更新完了"
fi
```

### 開発環境セットアップスクリプト

```bash
#!/bin/bash
# setup-development.sh

set -e

echo "🚀 開発環境セットアップ開始..."

# サブモジュール初期化
git submodule init
git submodule update

# 依存関係インストール
cd projects/liquid-glass-tech-blog
npm install

# 開発サーバー起動準備
cp .env.example .env.local

echo "✅ セットアップ完了"
echo "💡 開発サーバー起動: cd projects/liquid-glass-tech-blog && npm run dev"
```

## まとめ

Git Submoduleを使用することで：

### メリット
- ✅ **独立した開発**: 各プロジェクトが独立したリポジトリ
- ✅ **バージョン管理**: 特定バージョンを固定可能
- ✅ **統合開発**: 親プロジェクト内からの開発が可能
- ✅ **再利用性**: 複数のプロジェクトで同じサブモジュールを使用
- ✅ **個別デプロイ**: サブモジュール単独でのデプロイが可能

### 注意点
- ⚠️ **複雑性**: 通常のGit操作より複雑
- ⚠️ **同期管理**: 手動での更新が必要
- ⚠️ **学習コスト**: チーム全体での理解が必要

適切に運用することで、大規模プロジェクトの効率的な管理が可能になります。