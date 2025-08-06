# Workflow Composition と tasks.md の統合設計

## 概要
Workflow Composition Pattern + Smart Context Propagationは、Kiroのtasks.mdと自然に統合できる設計です。

## 統合アーキテクチャ

### 1. 階層的な責任分担
```
Workflow Composition (高レベル)
  ├── エージェント間の連携フロー制御
  ├── フェーズ間の遷移管理
  └── クラスター間の調整

tasks.md (実装レベル)
  ├── 具体的な実装タスクの管理
  ├── チェックボックスによる進捗追跡
  └── 要件との紐付け
```

### 2. Smart Context でのタスク状態統合
```json
{
  "workflow_context": {
    "current_phase": "implementation",
    "kiro_spec": {
      "feature": "user-auth-system",
      "tasks_file": ".kiro/specs/user-auth-system/tasks.md"
    },
    "tasks_progress": {
      "total": 12,
      "completed": 7,
      "current_task": "3.1",
      "blocked_tasks": []
    },
    "task_outputs": {
      "1.1": {
        "status": "completed",
        "files_created": ["src/db/schema.ts"],
        "test_coverage": 85
      }
    }
  }
}
```

### 3. ワークフロー定義でのタスク統合
```yaml
name: kiro-implementation-flow
phases:
  - name: task-generation
    agent: kiro-spec-tasks
    output: tasks-file
    
  - name: implementation
    type: task-driven  # tasks.mdベースの実装
    config:
      tasks_file: "${context.tasks_file}"
      execution_strategy: sequential
    steps:
      - for_each_task:
          agent: implementation-agent
          context:
            task_id: "${task.id}"
            task_description: "${task.description}"
            requirements: "${task.requirements}"
          on_complete:
            - update_task_status: completed
            - update_context: task_outputs
            
  - name: progress-check
    agent: kiro-spec-status
    trigger: 
      - on_task_complete
      - every: "5_tasks"
```

## 実装パターン

### Pattern 1: タスク駆動型ワークフロー
```yaml
workflow:
  type: task-driven
  source: tasks.md
  execution:
    - read_tasks_file
    - for_each_uncompleted_task:
        - execute_implementation
        - run_tests
        - update_checkbox
        - commit_changes
```

### Pattern 2: ハイブリッド制御
```yaml
workflow:
  phases:
    planning:
      agents: [research, planning]
    implementation:
      type: task-driven
      parallel_limit: 3  # 3タスクまで並列実行
    validation:
      agents: [testing, quality-check]
```

### Pattern 3: タスク状態による分岐
```yaml
workflow:
  conditions:
    - if: tasks.completed_ratio > 0.8
      then: integration-testing
    - if: tasks.has_blocked
      then: problem-solver
    - else: continue-implementation
```

## 具体的な実装例

### 1. タスク読み込みと解析
```python
# orchestrator内での実装
def load_task_progress(spec_name):
    tasks_file = f".kiro/specs/{spec_name}/tasks.md"
    tasks = parse_tasks_md(tasks_file)
    
    return {
        "total": len(tasks),
        "completed": len([t for t in tasks if t.completed]),
        "next_tasks": get_next_uncompleted_tasks(tasks, limit=3)
    }
```

### 2. タスク実行とコンテキスト更新
```python
def execute_task_workflow(context):
    task_info = context.tasks_progress.current_task
    
    # タスクに応じたエージェント選択
    if "test" in task_info.description.lower():
        agent = "testing-agent"
    elif "refactor" in task_info.description.lower():
        agent = "refactoring"
    else:
        agent = "implementation-agent"
    
    # 実行と結果の保存
    result = Task(agent, task_context)
    context.task_outputs[task_info.id] = result
    
    # tasks.mdの更新
    update_task_checkbox(task_info.id, completed=True)
```

### 3. 進捗に基づく動的ワークフロー
```yaml
dynamic_workflow:
  evaluate: context.tasks_progress
  rules:
    - when: all_infra_tasks_complete
      trigger: frontend_implementation
    - when: api_tasks_complete
      trigger: integration_testing
    - when: critical_path_blocked
      trigger: alternative_approach
```

## 利点

### 1. 既存のKiroワークフローとの完全互換
- tasks.mdファイルフォーマットはそのまま維持
- 既存のタスク管理プロセスを破壊しない

### 2. 高度な自動化
- タスクの依存関係を理解した実行順序
- 並列実行可能なタスクの自動検出
- 進捗に基づく動的なワークフロー調整

### 3. 詳細な進捗追跡
- ワークフローレベルとタスクレベルの両方で進捗管理
- リアルタイムでのボトルネック検出
- 完了予測とリソース最適化

### 4. エラーリカバリー
- 失敗したタスクの自動リトライ
- 代替アプローチの提案
- 部分的なロールバック

## 実装ロードマップ

1. **Phase 1**: 基本的なtasks.md読み込みと解析
2. **Phase 2**: タスク駆動型ワークフローの実装
3. **Phase 3**: Smart Contextでのタスク状態管理
4. **Phase 4**: 動的ワークフローと並列実行
5. **Phase 5**: 高度な分析と最適化