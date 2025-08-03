# Integration Test Command

## Usage
```bash
/integration-test <project-name> [options]
```

## Description
Comprehensive integration testing command that orchestrates end-to-end testing workflows including test planning, environment setup, execution, and reporting.

## Examples

### Basic Integration Test
```bash
/integration-test user-auth-system
# → .kiro/specs/user-auth-system/ の仕様を解析
# → 統合テスト戦略を立案
# → テスト環境をセットアップ
# → E2Eテストを実行
# → 包括的なテストレポートを生成
```

### API Integration Test with Database
```bash
/integration-test payment-api --include-db --env staging
# → 決済APIの統合テストを実行
# → データベース統合を含む
# → ステージング環境で実行
```

### Cross-Service Integration Test
```bash
/integration-test microservices --services auth,payment,notification
# → 複数サービス間の統合テストを実行
# → サービス間連携の検証
# → 分散システムのテスト
```

## Options
- `--include-db`: データベース統合テストを含む
- `--env <environment>`: テスト環境を指定 (local/staging/test)
- `--services <list>`: テスト対象サービスをカンマ区切りで指定
- `--parallel`: 並列テスト実行
- `--coverage`: カバレッジレポート生成
- `--performance`: パフォーマンステストを含む

## Test Types Covered
- API統合テスト
- データベース統合テスト
- サービス間連携テスト
- E2Eユーザーシナリオテスト
- パフォーマンステスト
- セキュリティテスト

## Integration Capabilities
- Docker/Docker Compose環境管理
- テストデータ準備と後片付け
- モックサービス管理
- CI/CD パイプライン統合
- テスト結果の自動レポート生成

## Output
- 詳細なテスト実行ログ
- カバレッジレポート (HTML/XML)
- パフォーマンスメトリクス
- 失敗したテストの詳細分析
- CI/CD統合用のJUnit XMLレポート

## Workflow
1. **戦略立案**: プロジェクト仕様から統合テスト戦略を生成
2. **環境準備**: 必要なテスト環境とデータを準備
3. **テスト実行**: 計画された統合テストを順次/並列実行
4. **結果分析**: テスト結果を分析し包括的レポートを生成

## Implementation
このコマンドは `Integration Test` エージェントを呼び出し、サブエージェント群と連携して統合テストワークフローを実行します。

## Related Commands
- `/coding` - 実装フェーズでの統合
- `/check-issues` - テスト結果の承認プロセス
- `/create-issues` - テスト失敗時のIssue作成