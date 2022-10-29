import React from 'react'
export default function hasQueue(process: boolean = true): {
  tasks: ReadonlyArray<Task>
  isProcessing: boolean
  addTask: (task: Task) => void
} {
  const [queue, setQueue] = React.useState<{
    isProcessing: boolean
    tasks: Array<Task>
  }>({ isProcessing: false, tasks: [] })

  React.useEffect(() => {
    if (!process) return
    if (queue.tasks.length === 0) return
    if (queue.isProcessing) return

    const task = queue.tasks[0]
    setQueue((prev) => ({
      isProcessing: true,
      tasks: prev.tasks.slice(1),
    }))

    Promise.resolve(task.task()).finally(() => {
      setQueue((prev) => ({
        isProcessing: false,
        tasks: prev.tasks,
      }))
    })
  }, [queue, process])

  return {
    tasks: queue.tasks,
    isProcessing: queue.isProcessing,
    addTask: React.useCallback((task) => {
      setQueue((prev) => ({
        isProcessing: prev.isProcessing,
        tasks: [...prev.tasks, task],
      }))
    }, []),
  }
}

type Task = { task: () => Promise<void> | void; tags?: string[] }
