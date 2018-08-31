import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Identifiers } from '@angular/compiler';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  chatQueryString: string;
  searchBoxField = false;;
  queryString: string;
  selectedMessageId: any;
  chatRoom: any;
  selectedRecord: any;
  records: Object;

  checkedAll = false;
  checkedFunds = false;
  checkedCompanies = false;
  checkedHNIs = false;
  isMatched: boolean;
  handsetChatMessage = false;
  constructor(public breakpointObserver: BreakpointObserver, private dataService: DataService) { }

  ngOnInit() {
    this.breakpointObserver
      .observe([Breakpoints.Small, Breakpoints.HandsetPortrait])
      .subscribe((state: BreakpointState) => {
        if (state.matches) {
          this.isMatched = true;
        } else {
          this.isMatched = false;
        }
      });

    this.dataService.getSideContent().subscribe(res => {
      this.records = res;
    });
    this.getData('1');
  }

  getData(id) {
    this.dataService.getDataById(id).subscribe(res => {
      this.selectedRecord = res[0];
    });
    this.dataService.getChatData(id).subscribe(res => {
      this.chatRoom = res[0].data;
    });
  }

  getChatDataForHandset(id) {
    this.dataService.getChatData(id).subscribe(res => {
      this.chatRoom = res[0].data;
      this.handsetChatMessage = true;
    });
  }

  showMessage(id) {
    this.selectedMessageId = id;
  }

  goback() {
    this.handsetChatMessage = false;
  }

  searchBox() {
    this.searchBoxField = true;
  }

  applyFilter(searchString: string, type) {
    if (type == 'userlist') {
      this.queryString = searchString;
    } else {
      this.chatQueryString = searchString;
    }
  }

  checkedFilter(isChecked, searchString: string) {
    if (isChecked.checked) {
      this.queryString = searchString;
    } else {
      this.queryString = '';
    }
  }
}
