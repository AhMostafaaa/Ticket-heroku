import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'user-cmp',
  moduleId: module.id,
  templateUrl: 'reservation.component.html'
})


export class ReservationComponent implements OnInit {

  @ViewChild('staticTabs', { static: false }) staticTabs: TabsetComponent;
  public addNewEvent: FormGroup;
  public extraInfo: FormGroup;
  public AddNewTicket: FormGroup;
  showError: boolean = false;
  events: object[] = [];
  tickets:object[] = [];
  dates:object[]= [];
  containers = [];
  products = [
    { id: 1, name: "Automativ Parts" },
    { id: 2, name: "Car Accessories" },
    { id: 3, name: "Clothings" },
    { id: 4, name: "Digital Books / Books" },
    { id: 5, name: "Electronics" },
    { id: 6, name: "Fashion" },
    { id: 7, name: "Fitness Products" },
    { id: 8, name: "Flowers" },
    { id: 9, name: "Food & Beverage" },
    { id: 10, name: "Games / Toys / Gifts" },
    { id: 11, name: "Gifts / Crafts" },
    { id: 12, name: "Gym Supplies" },
    { id: 13, name: "Home Made Products" },
    { id: 14, name: "Home Decoration" },
    { id: 15, name: "Music Products" },
    { id: 16, name: "Optical Goods" },
    { id: 17, name: "Paintings" },
    { id: 18, name: "Technology Products" },
    { id: 19, name: "Tools / Equipments /Supplies" },
    { id: 20, name: "Others" }
  ];
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });
  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    this.addNewEvent = new FormGroup({
      eventName: new FormControl('', [Validators.required]),
      eventDesc: new FormControl('', [Validators.required]),
    });
    this.extraInfo = new FormGroup({
      selectOption: new FormControl('', Validators.required),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required])
    });
    this.AddNewTicket = new FormGroup({
      ticketName: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      totalQuantity: new FormControl('', [Validators.required])
    });
  }
  disableEvent() {
    if (this.addNewEvent.invalid) {
      this.showError = true;
    } else if (this.addNewEvent.valid) {
      this.staticTabs.tabs[1].disabled = false;
      this.staticTabs.tabs[1].active = true;
      this.showError = false;
    }
  }
  disableInfo() {
    if (this.extraInfo.invalid) {
      this.showError = true;
    } else if (this.extraInfo.valid) {
      this.showError = false;
      this.staticTabs.tabs[2].disabled = false;
      this.staticTabs.tabs[2].active = true;
    }
  }
  disableTicket() {
    if (this.AddNewTicket.invalid) {
      this.showError = true;
    } else if (this.AddNewTicket.valid) {
      this.showError = false;
      this.staticTabs.tabs[3].disabled = false;
      this.staticTabs.tabs[3].active = true;
    }
  }
  addTicket() {
    this.containers.push(this.containers.length);
  }
  deleteTicket(index) {
    if (index > 0) {
      this.containers.splice(index, 1);
    }
  }
  addEvent(eventData) {
    if (this.addNewEvent.invalid) {
      return;
    } else {
      let eventDetails = {
        name: eventData.value.eventName,
        description: eventData.value.eventDesc
      };
      this.events.push(eventDetails);
    }
  }
  addExtra(extraData) {
    if (this.extraInfo.invalid) {
      return;
    } else {
      let extraDetails = {
        option: extraData.value.selectOption,
        startDate: extraData.value.startDate,
        endDate: extraData.value.endDate
      };
      this.dates.push(extraDetails);
    }
  }
  addTicketdata(ticketData) {
    if (this.AddNewTicket.invalid) {
      return;
    } else {
      let ticketDescription = {
        ticketName: ticketData.value.ticketName,
        ticketPrice: ticketData.value.price,
        ticketQuantity: ticketData.value.totalQuantity
      };
      this.tickets.push(ticketDescription);
      this.showSuccess();
    }
  }
  showSuccess() {
    this.toastr.success('You Just Got Successful Added!' , '' ,{
      timeOut:4000
    });
  }
}
