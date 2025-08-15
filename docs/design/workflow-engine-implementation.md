# Workflow Engine Implementation

## Overview
Implementation of Workflow Composition Pattern + Smart Context Propagation for orchestrator.md

## Core Components

### 1. Workflow Definition Loader
```python
def load_workflow(workflow_name):
    """Load and parse workflow definition from YAML"""
    workflow_path = f".kiro/workflows/{workflow_name}.yaml"
    with open(workflow_path) as f:
        return yaml.safe_load(f)
```

### 2. Smart Context Manager
```python
class SmartContext:
    def __init__(self, workflow_name, feature_name=None):
        self.workflow_name = workflow_name
        self.feature_name = feature_name
        self.data = {}
        self.phase_history = []
        self.current_phase = None
        
    def update_phase_output(self, phase_name, output_data):
        """Update context with phase output"""
        self.data[f"{phase_name}_output"] = output_data
        if phase_name not in self.phase_history:
            self.phase_history.append(phase_name)
    
    def get_input_for_phase(self, phase_definition):
        """Prepare input context for a phase"""
        inputs = {}
        for input_key in phase_definition.get('inputs', []):
            if input_key in self.data:
                inputs[input_key] = self.data[input_key]
        return inputs
    
    def save_to_file(self):
        """Persist context to file"""
        context_file = f".kiro/context/{self.workflow_name}-{self.feature_name}.json"
        with open(context_file, 'w') as f:
            json.dump(self.data, f, indent=2)
```

### 3. Task-Driven Execution Engine
```python
def execute_task_driven_phase(phase_def, context):
    """Execute task-driven implementation phase"""
    tasks_file = phase_def['source'].replace('${feature_name}', context.feature_name)
    tasks = parse_tasks_md(tasks_file)
    
    execution_strategy = phase_def.get('execution_strategy', {})
    parallel_limit = execution_strategy.get('parallel_limit', 1)
    
    if parallel_limit > 1:
        return execute_parallel_tasks(tasks, phase_def, context, parallel_limit)
    else:
        return execute_sequential_tasks(tasks, phase_def, context)

def execute_task_with_agent_selection(task, phase_def, context):
    """Select appropriate agent based on task content and execute"""
    agent_rules = phase_def.get('task_execution', {}).get('agent_selection_rules', [])
    selected_agent = phase_def.get('task_execution', {}).get('default_agent', 'implementation-agent')
    
    # Rule-based agent selection
    for rule in agent_rules:
        if 'pattern' in rule:
            if re.search(rule['pattern'], task.description, re.IGNORECASE):
                selected_agent = rule['agent']
                break
    
    # Execute with selected agent
    task_context = {
        'task_id': task.id,
        'task_description': task.description,
        'requirements': task.requirements,
        'context': context.data
    }
    
    return Task(selected_agent, task_context)
```

### 4. Workflow Executor
```python
def execute_workflow(workflow_name, feature_name=None, start_phase=None):
    """Main workflow execution engine"""
    workflow = load_workflow(workflow_name)
    context = SmartContext(workflow_name, feature_name)
    
    # Load existing context if available
    if context_file_exists():
        context.load_from_file()
    
    current_phase_name = start_phase or determine_current_phase(workflow, context)
    
    while current_phase_name:
        phase_def = find_phase_definition(workflow, current_phase_name)
        
        # Phase execution based on type
        if phase_def.get('type') == 'task_driven':
            result = execute_task_driven_phase(phase_def, context)
        elif phase_def.get('type') == 'conditional':
            next_phase_name = evaluate_conditional_phase(phase_def, context)
            continue
        else:
            # Standard agent execution
            result = execute_standard_phase(phase_def, context)
        
        # Update context with results
        context.update_phase_output(current_phase_name, result)
        context.current_phase = current_phase_name
        
        # Handle approval if required
        if phase_def.get('approval_required'):
            approval_result = handle_approval_workflow(current_phase_name, result)
            if not approval_result.approved:
                return handle_rejection(approval_result, phase_def, context)
        
        # Determine next phase
        next_phase_name = determine_next_phase(phase_def, context, workflow)
        
        # Save context
        context.save_to_file()
        
        current_phase_name = next_phase_name
    
    return generate_completion_report(context)
```

## Implementation in orchestrator.md

The orchestrator command will implement this engine internally:

```python
# Core orchestrator logic
def orchestrator_main(arguments=None):
    # 1. Project State Analysis
    project_state = analyze_project_state()
    
    # 2. Workflow Selection
    if arguments and "kiro" in arguments.lower():
        workflow_name = "kiro-sdd"
    elif arguments and "coding" in arguments.lower():
        workflow_name = "coding"
    else:
        workflow_name = intelligent_workflow_selection(project_state)
    
    # 3. Feature Detection
    feature_name = extract_feature_name(arguments, project_state)
    
    # 4. Workflow Execution
    result = execute_workflow(workflow_name, feature_name)
    
    # 5. Results Reporting
    return format_results(result)
```

## Error Handling and Recovery

```python
def handle_workflow_error(error, phase_name, context):
    """Handle errors with retry and recovery strategies"""
    retry_policy = context.workflow.get('error_handling', {}).get('retry_policy', {})
    
    if should_retry(error, retry_policy):
        return retry_phase_execution(phase_name, context)
    
    recovery_strategy = determine_recovery_strategy(error, phase_name)
    return execute_recovery_strategy(recovery_strategy, context)

def create_checkpoint(context, phase_name):
    """Create recovery checkpoint"""
    checkpoint = {
        'timestamp': datetime.now().isoformat(),
        'phase': phase_name,
        'context_snapshot': context.data.copy(),
        'file_state': capture_file_state()
    }
    
    checkpoint_file = f".kiro/checkpoints/{context.workflow_name}-{phase_name}.json"
    with open(checkpoint_file, 'w') as f:
        json.dump(checkpoint, f, indent=2)
```

## Integration with tasks.md

```python
def parse_tasks_md(file_path):
    """Parse tasks.md file and extract task information"""
    with open(file_path, 'r') as f:
        content = f.read()
    
    tasks = []
    current_task = None
    
    for line in content.split('\n'):
        task_match = re.match(r'- \[([ x])\] (.+)', line)
        if task_match:
            completed = task_match.group(1) == 'x'
            description = task_match.group(2)
            
            # Extract task ID if present
            task_id_match = re.match(r'(\d+(?:\.\d+)*)\s+(.+)', description)
            if task_id_match:
                task_id = task_id_match.group(1)
                description = task_id_match.group(2)
            else:
                task_id = str(len(tasks) + 1)
            
            tasks.append({
                'id': task_id,
                'description': description,
                'completed': completed,
                'sub_tasks': [],
                'requirements': extract_requirements(line)
            })
    
    return tasks

def update_task_checkbox(file_path, task_id, completed=True):
    """Update task completion status in tasks.md"""
    with open(file_path, 'r') as f:
        content = f.read()
    
    # Update checkbox for specific task
    pattern = rf'(- \[)[ x](\] {re.escape(task_id)}.+)'
    replacement = r'\1x\2' if completed else r'\1 \2'
    
    updated_content = re.sub(pattern, replacement, content)
    
    with open(file_path, 'w') as f:
        f.write(updated_content)
```