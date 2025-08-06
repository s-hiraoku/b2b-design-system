# ワークフローエンジン設計

## 概要
ARCHITECTURE.mdの理想的なサブエージェント連携を実現するための状態駆動型ワークフローエンジン

## コアコンセプト

### 1. ワークフロー定義
```yaml
# .kiro/workflows/kiro-sdd.yaml
name: kiro-sdd-workflow
description: Kiro SDD完全自動化ワークフロー
phases:
  - name: steering
    agent: kiro-steering
    required: true
    output: steering-context
    
  - name: init
    agent: kiro-spec-init
    input: steering-context
    output: spec-metadata
    
  - name: requirements
    agent: kiro-spec-requirements
    input: spec-metadata
    output: requirements-doc
    approval_required: true
    
  - name: design
    agent: kiro-spec-design
    input: requirements-doc
    output: design-doc
    approval_required: true
    
  - name: tasks
    agent: kiro-spec-tasks
    input: design-doc
    output: tasks-list
    approval_required: true
```

### 2. 状態管理
```json
// .kiro/workflow-state.json
{
  "active_workflow": "kiro-sdd-workflow",
  "current_phase": "requirements",
  "phase_status": {
    "steering": {
      "status": "completed",
      "output": {
        "context": "...",
        "files_created": ["steering/product.md", "steering/tech.md"]
      }
    },
    "init": {
      "status": "completed",
      "output": {
        "feature_name": "user-auth",
        "spec_directory": ".kiro/specs/user-auth"
      }
    },
    "requirements": {
      "status": "in_progress",
      "started_at": "2024-01-20T10:00:00Z"
    }
  },
  "context_chain": {
    "steering-context": {...},
    "spec-metadata": {...}
  }
}
```

### 3. Orchestrator実装パターン

```python
# orchestrator.md内の擬似コード

def execute_workflow(workflow_name):
    # ワークフロー定義を読み込み
    workflow = load_workflow(f".kiro/workflows/{workflow_name}.yaml")
    state = load_state(".kiro/workflow-state.json")
    
    # 現在のフェーズを特定
    current_phase = find_current_phase(state, workflow)
    
    while current_phase:
        # フェーズ実行
        phase_def = workflow.phases[current_phase]
        
        # 入力コンテキストの準備
        input_context = prepare_input(phase_def, state.context_chain)
        
        # エージェント実行
        result = Task(
            subagent_type=phase_def.agent,
            prompt=build_prompt(phase_def, input_context)
        )
        
        # 結果を状態に保存
        state.phase_status[current_phase] = {
            "status": "completed",
            "output": result
        }
        state.context_chain[phase_def.output] = result
        
        # 承認が必要な場合
        if phase_def.approval_required:
            approval = request_approval(current_phase, result)
            if not approval:
                state.phase_status[current_phase]["status"] = "awaiting_approval"
                break
        
        # 次のフェーズへ
        current_phase = get_next_phase(workflow, current_phase)
        save_state(state)
```

## 実装の利点

### 1. 疎結合
- 各エージェントは独立して動作
- ワークフロー定義の変更が容易
- 新しいワークフローの追加が簡単

### 2. 状態の永続化
- 中断・再開が可能
- エラーからの復旧が容易
- 進捗の可視化

### 3. 柔軟な制御
- 条件分岐の実装が可能
- 並列実行のサポート
- 動的なワークフロー変更

## ワークフロータイプ

### 基本的な連鎖
```yaml
type: sequential
phases:
  - agent: agent-a
  - agent: agent-b
  - agent: agent-c
```

### 条件分岐
```yaml
type: conditional
phases:
  - agent: analyzer
    output: analysis
  - condition:
      if: analysis.complexity == "high"
      then: complex-handler
      else: simple-handler
```

### 並列実行
```yaml
type: parallel
phases:
  - parallel_group:
    - agent: test-unit
    - agent: test-integration
    - agent: test-e2e
  - agent: test-reporter  # 全て完了後に実行
```

### ループ実行
```yaml
type: iterative
phases:
  - agent: task-executor
    loop:
      over: tasks_list
      until: all_completed
```

## 実装手順

1. **ワークフロー定義フォーマットの確定**
2. **状態管理システムの実装**
3. **orchestrator.mdへのエンジン実装**
4. **既存ワークフローの移行**
5. **テストと検証**