# PR Create Command

## Usage
```bash
/pr-create <feature-branch> [options]
```

## Description
Automated pull request creation command that analyzes changes, generates comprehensive PR descriptions, validates quality, and creates well-structured pull requests with proper metadata and integration.

## Examples

### Basic PR Creation
```bash
/pr-create feature/user-authentication
# → 現在のブランチの変更を分析
# → 包括的なPR説明を生成
# → テスト結果とカバレッジを含む
# → GitHub PRを自動作成
```

### PR with Custom Target Branch
```bash
/pr-create feature/payment-api --target develop
# → developブランチに対するPRを作成
# → 変更の影響範囲を分析
# → 適切なレビュアーを提案
```

### Draft PR Creation
```bash
/pr-create feature/experimental --draft
# → ドラフトPRとして作成
# → 作業中のステータスを明示
# → 早期フィードバック収集用
```

## Options
- `--target <branch>`: ターゲットブランチを指定 (default: main)
- `--draft`: ドラフトPRとして作成
- `--auto-assign`: 自動的にレビュアーを割り当て
- `--include-tests`: テスト結果を詳細に含める
- `--link-issues`: 関連Issueを自動リンク

## PR Analysis Features
- **変更分析**: コード変更の詳細な分析
- **影響範囲評価**: 変更の影響を受ける範囲の特定
- **テスト結果統合**: 自動テスト結果の包含
- **品質チェック**: コード品質とカバレッジの検証

## Generated PR Content
- **明確なタイトル**: 変更内容を反映した分かりやすいタイトル
- **詳細な説明**: 変更理由、実装詳細、テスト方法
- **チェックリスト**: レビュー用のチェックリスト
- **関連リンク**: Issue、仕様書、ドキュメントへのリンク

## Quality Validation
- **コードレビュー準備**: レビューしやすい形での情報整理
- **CI/CD統合**: 自動テストとビルドの確認
- **セキュリティチェック**: セキュリティ関連の変更の検証
- **パフォーマンス評価**: パフォーマンスへの影響評価

## Automated Features
- **ラベル付け**: 変更タイプに基づく自動ラベル付け
- **マイルストーン設定**: 関連マイルストーンの自動設定
- **レビュアー提案**: 変更領域に基づくレビュアー提案
- **テンプレート適用**: プロジェクト固有のPRテンプレート適用

## Integration Capabilities
- **GitHub**: GitHub Pull Request API統合
- **GitLab**: GitLab Merge Request対応
- **Azure DevOps**: Azure Repos Pull Request対応
- **Bitbucket**: Bitbucket Pull Request対応

## Workflow Integration
- **CI/CD**: 自動テストとビルドの起動
- **Code Quality**: SonarQube、CodeClimate連携
- **Documentation**: 自動ドキュメント更新
- **Notification**: Slack、Teams通知統合

## Output
- **PR URL**: 作成されたPRへの直接リンク
- **分析レポート**: 変更分析の詳細レポート
- **品質スコア**: コード品質とレビュー準備度
- **推奨アクション**: レビュー前の推奨改善点

## Implementation
このコマンドは `PR Create` エージェントを呼び出し、サブエージェント群と連携してPR作成ワークフローを実行します。

## Related Commands
- `/check-issues` - PR作成前の要件確認
- `/integration-test` - PR作成前のテスト実行
- `/refactoring` - PR作成前のコード改善