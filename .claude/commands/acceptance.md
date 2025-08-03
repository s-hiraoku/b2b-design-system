# Acceptance Command

## Usage
```bash
/acceptance <feature-name> [options]
```

## Description
Human approval workflow for feature acceptance with feedback analysis and automated phase re-execution based on review results.

## Examples

### Basic Acceptance Review
```bash
/acceptance user-authentication
# → 開発完了した機能の受け入れレビューを開始
# → 人間承認者に包括的なレビュー情報を提示
# → 承認/却下の決定を待機
# → フィードバックに基づいて次のアクションを決定
```

### Acceptance with Specific Reviewer
```bash
/acceptance payment-api --reviewer product-owner
# → 指定されたレビュアーによる受け入れテスト
# → ビジネス要件との適合性を重点的にチェック
```

### Quick Acceptance Check
```bash
/acceptance hotfix-security --quick
# → 緊急修正の簡易受け入れチェック
# → 最小限の検証項目で迅速な承認プロセス
```

## Options
- `--reviewer <role>`: 特定のレビュアー役割を指定 (product-owner, tech-lead, qa-lead)
- `--quick`: 簡易受け入れモード (緊急時用)
- `--detailed`: 詳細受け入れモード (大規模機能用)
- `--auto-retry`: フィードバック解析後の自動再実行

## Acceptance Process
1. **レビュー準備**: 開発成果物の包括的分析
2. **人間承認**: ステークホルダーによる受け入れ判定
3. **フィードバック解析**: NGの場合のフィードバック分析
4. **フェーズ調整**: 必要な再実行フェーズの特定
5. **自動再実行**: 指定されたフェーズからの自動実行

## Review Categories
- **機能要件**: ビジネス要件との適合性
- **非機能要件**: パフォーマンス、セキュリティ、可用性
- **ユーザビリティ**: UI/UX、使いやすさ
- **技術品質**: コード品質、アーキテクチャ、保守性
- **テスト品質**: テストカバレッジ、品質保証

## Feedback Analysis
NGの場合、フィードバックを解析して再実行が必要なフェーズを特定：

### 要件レベルのフィードバック
- **仕様見直し** → Kiro SDD仕様から再実行
- **設計変更** → 設計フェーズから再実行

### 実装レベルのフィードバック
- **コード品質** → リファクタリングフェーズから再実行
- **機能不足** → コーディングフェーズから再実行

### テストレベルのフィードバック
- **テスト不足** → テストフェーズから再実行
- **バグ修正** → コーディング+テストフェーズから再実行

## Automated Actions
### 承認時 (OK)
- 受け入れ完了の記録
- ステークホルダーへの通知
- 次のフェーズ（リリース準備等）への進行

### 却下時 (NG)
- フィードバック詳細分析
- 再実行フェーズの特定
- 自動的な該当フェーズからの再実行
- 進捗追跡とレポート生成

## Integration Points
- **GitHub Issues**: 受け入れ結果の記録
- **Slack/Teams**: リアルタイム通知
- **Jira**: プロジェクト管理連携
- **Documentation**: 受け入れ基準と結果の文書化

## Quality Gates
- **受け入れ基準**: 事前定義された受け入れ条件の確認
- **回帰テスト**: 既存機能への影響確認
- **パフォーマンス**: 性能要件の達成確認
- **セキュリティ**: セキュリティ要件の遵守確認

## Output
- **受け入れレポート**: 詳細な受け入れ結果
- **フィードバック分析**: NG理由の構造化分析
- **アクションプラン**: 次に実行すべきフェーズと手順
- **進捗追跡**: 再実行プロセスの進捗状況

## Workflow Integration
このコマンドは開発ワークフロー全体の最終段階として実行され、必要に応じて前のフェーズへの自動的な戻りと再実行を管理します。

## Implementation
このコマンドは `Acceptance` エージェントを呼び出し、サブエージェント群と連携して受け入れワークフローを実行します。