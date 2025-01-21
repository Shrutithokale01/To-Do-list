import { CommonModule } from '@angular/common';  // Added DatePipe and CommonModule
import { Component, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Added FormsModule

interface Task {
  assignedTo: string;
  status: string;
  dueDate: Date;
  priority: string;
  comments: string;
  completed: boolean;
}

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], filterString: string): any[] {
    if (!value || !filterString) {
      return value;
    }
    return value.filter(task => task.comments.toLowerCase().includes(filterString.toLowerCase()));  // Updated to filter by comments
  }
}

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DatePipe],  // Add DatePipe to the providers array
  imports: [CommonModule, FormsModule]  // Added FormsModule and CommonModule
})
export class AppComponent {
  tasks: Task[] = [
    { assignedTo: "User 1", status: "Completed", dueDate: new Date(2024, 10, 12), priority: "Low", comments: "This task is good", completed: true },
    { assignedTo: "User 2", status: "In Progress", dueDate: new Date(2024, 8, 14), priority: "High", comments: "This", completed: false },
    { assignedTo: "User 3", status: "Not Started", dueDate: new Date(2024, 8, 18), priority: "Low", comments: "This", completed: false },
    { assignedTo: "User 4", status: "In Progress", dueDate: new Date(2024, 11, 5), priority: "Normal", comments: "This task is good", completed: false }
  ];

  searchQuery = '';
  currentPage = 1;
  pageSize = 20;

  constructor(private datePipe: DatePipe) {}

  newTask() {
    // Implementation for adding a new task
  }

  refresh() {
    // Implementation for refreshing the task list
  }

  search() {
    // Filter tasks based on search query
  }

  editTask(task: Task) {
    // Implementation for editing a task
  }

  deleteTask(task: Task) {
    // Implementation for deleting a task
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  get totalPages() {
    return Math.ceil(this.tasks.length / this.pageSize);
  }

  get filteredTasks() {
    return this.tasks.filter(task => task.comments.toLowerCase().includes(this.searchQuery.toLowerCase()));  // Fixed to filter by comments
  }

  title = 'cwh-todo-list';
}
