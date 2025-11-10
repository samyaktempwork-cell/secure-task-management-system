import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: any[] = [];
  newTask = { title: '', description: '' };

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchTasks();
  }

  fetchTasks() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.get<any[]>('http://localhost:3000/api/tasks', { headers }).subscribe({
      next: (res) => this.tasks = res,
      error: (err) => console.error('Error fetching tasks:', err)
    });
  }

  addTask() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.post('http://localhost:3000/api/tasks', this.newTask, { headers }).subscribe({
      next: () => this.fetchTasks(),
      error: (err) => console.error('Error creating task:', err)
    });
  }

  deleteTask(id: number) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete(`http://localhost:3000/api/tasks/${id}`, { headers }).subscribe({
      next: () => this.fetchTasks(),
      error: (err) => console.error('Error deleting task:', err)
    });
  }
}
