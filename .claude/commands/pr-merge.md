# PR Merge Command

## Usage
```bash
/pr-merge <pr-number|pr-url> [options]
```

## Description
Human-approved pull request merge workflow that validates merge readiness, obtains human approval, executes merge, and manages post-merge activities.

## Examples

### Basic PR Merge with Human Approval
```bash
/pr-merge 123
# → PR #123のマージ準備状況を確認
# → 人間承認者にマージ承認を求める
# → 承認後にマージを実行
# → ポストマージ活動を管理
```

### PR Merge with Specific Approver
```bash
/pr-merge https://github.com/owner/repo/pull/456 --approver tech-lead
# → 技術リードによるマージ承認
# → 技術的観点での最終確認
```

### Emergency Merge with Fast Track
```bash
/pr-merge 789 --emergency --approver on-call-engineer
# → 緊急時の迅速マージプロセス
# → 最小限の検証で迅速な承認
```

## Options
- `--approver <role>`: 特定の承認者役割を指定 (tech-lead, product-owner, release-manager)
- `--emergency`: 緊急マージモード（簡略化された検証）
- `--strategy <merge|squash|rebase>`: マージ戦略を指定
- `--auto-delete-branch`: マージ後にブランチを自動削除
- `--skip-ci`: CI完了を待たずにマージ（緊急時のみ）

## Merge Readiness Validation
- **CI/CD Status**: 全てのチェックが通過していることを確認
- **Code Review**: 必要な承認が得られていることを検証
- **Conflicts**: マージコンフリクトがないことを確認
- **Branch Policy**: ブランチ保護ルールの遵守確認

## Human Approval Process
1. **マージ準備確認**: PR状態とマージ可能性の検証
2. **承認要請**: 指定された承認者への承認依頼
3. **インタラクティブレビュー**: 変更内容とリスクの説明
4. **決定収集**: 承認/却下の明確な決定取得

## Merge Execution
- **マージ戦略選択**: Merge commit, Squash merge, Rebase merge
- **安全なマージ実行**: コンフリクト検出と安全性確認
- **検証**: マージ後の整合性とビルド確認
- **ロールバック準備**: 問題発生時の迅速なロールバック

## Post-Merge Activities
- **ブランチクリーンアップ**: 不要なブランチの削除
- **通知**: チームとステークホルダーへの完了通知
- **ドキュメント更新**: 変更ログとリリースノートの更新
- **メトリクス記録**: マージ統計とパフォーマンス記録

## Safety Mechanisms
- **プリフライトチェック**: マージ前の包括的な安全性確認
- **段階的実行**: 各ステップでの確認と検証
- **自動ロールバック**: 問題検出時の自動復旧
- **監査ログ**: 全ての操作の詳細記録

## Approval Criteria
### Standard Approval
- CI/CDパイプラインの完全通過
- 必要なコードレビュー承認の取得
- マージコンフリクトの解決
- ブランチ保護ルールの遵守

### Emergency Approval
- 最小限のCI確認（単体テストのみ）
- 緊急時承認者の承認
- セキュリティ脆弱性の修正確認
- 迅速なロールバック計画

## Integration Points
- **GitHub/GitLab**: PR情報とマージ実行
- **CI/CD Systems**: パイプライン状態確認
- **Notification Systems**: Slack、Teams、メール通知
- **Monitoring**: マージ後のシステム監視

## Risk Management
- **影響評価**: 変更の潜在的影響の評価
- **ロールバック計画**: 問題発生時の復旧手順
- **監視設定**: マージ後の異常検知
- **エスカレーション**: 問題発生時の連絡体制

## Output
- **マージ結果**: 成功/失敗とその詳細
- **影響レポート**: マージによる変更の影響分析
- **メトリクス**: マージ時間、承認時間、品質指標
- **監査ログ**: 承認プロセスと実行の完全な記録

## Implementation
このコマンドは `PR Merge` エージェントを呼び出し、サブエージェント群と連携してマージワークフローを実行します。

## Related Commands
- `/pr-create` - PRマージ前のPR作成
- `/acceptance` - マージ前の最終受け入れ確認
- `/check-issues` - マージ前の要件確認