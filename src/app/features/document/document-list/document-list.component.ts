import { Component, OnDestroy, OnInit } from '@angular/core';
import { DocumentObject } from '../models/document-object.model';
import { AuthService } from '../../auth/services/auth.service';
import { LoginUser } from '../../auth/models/login-user.model';

@Component({
  selector: 'app-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  documents: DocumentObject[] = [
    {
      id: '1',
      title: 'Project Proposal',
      content: 'Initial draft of the project proposal for Q2 expansion, outlining key milestones and resource allocations.',
      modifiedDate: new Date('2025-03-20T10:15:00')
    },
    {
      id: '2',
      title: 'Meeting Notes',
      content: 'Notes from the team sync meeting held on April 1st, covering action items, blockers, and key decisions made.',
      modifiedDate: new Date('2025-04-01T14:30:00')
    },
    {
      id: '3',
      title: 'Budget Report',
      content: 'Detailed analysis of Q1 budget and forecast for Q2, including departmental breakdowns and expense projections.',
      modifiedDate: new Date('2025-03-15T09:45:00')
    },
    {
      id: '4',
      title: 'Marketing Plan',
      content: 'Plan for launching the new marketing campaign in May, featuring social media strategies and target demographics.',
      modifiedDate: new Date('2025-04-10T11:00:00')
    },
    {
      id: '5',
      title: 'Technical Specs',
      content: 'Specifications for the new API features being developed, with detailed descriptions and endpoint structures.',
      modifiedDate: new Date('2025-02-27T08:20:00')
    },
    {
      id: '6',
      title: 'User Feedback',
      content: 'Summary of user feedback collected from recent surveys, highlighting common pain points and suggestions.',
      modifiedDate: new Date('2025-03-05T16:10:00')
    },
    {
      id: '7',
      title: 'Release Notes',
      content: 'Details of the v2.3 release, including bug fixes and features, performance improvements, and known issues.',
      modifiedDate: new Date('2025-04-12T13:40:00')
    },
    {
      id: '8',
      title: 'Team Roster',
      content: 'Updated team roster including new hires and roles, organized by department with responsibilities listed.',
      modifiedDate: new Date('2025-04-04T12:00:00')
    },
    {
      id: '9',
      title: 'Training Guide',
      content: 'Guide for onboarding new employees to the dev environment, including tools, processes, and best practices.',
      modifiedDate: new Date('2025-03-25T17:00:00')
    },
    {
      id: '10',
      title: 'System Architecture',
      content: 'Overview of the microservices and deployment strategy, with diagrams and explanation of service responsibilities.',
      modifiedDate: new Date('2025-02-20T15:30:00')
    }
  ];

  loginUser?: LoginUser

  constructor(private authService: AuthService) {
    
  }

  ngOnInit(): void {
    this.loginUser = this.authService.getUser();
  }

  isReadable(): boolean {
    if (this.loginUser) {
      return this.loginUser.roles.includes("isReadable")
    }
    return false
  }

  isWritable(): boolean {
    if (this.loginUser) {
      return this.loginUser.roles.includes("isWritable")
    }
    return false
  }

  isDeletable(): boolean {
    if (this.loginUser) {
      return this.loginUser.roles.includes("isDeletable")
    }
    return false
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }
}
