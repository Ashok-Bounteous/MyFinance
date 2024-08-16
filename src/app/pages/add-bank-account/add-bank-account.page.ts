import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { BankAccountService } from 'src/app/services/bank-account.service';

interface StateCodeMapping {
  [key: string]: string;
}

@Component({
  selector: 'app-add-bank-account',
  templateUrl: './add-bank-account.page.html',
  styleUrls: ['./add-bank-account.page.scss'],
  providers: [MessageService]
})
export class AddBankAccountPage implements OnInit {
  stepForm: FormGroup;
  items: MenuItem[] = [];
  currentStep: number = 0;
  states: any[] = [];
  bankNames: any[] = [];
  filteredStates: any[] = [];
  filteredBankNames: any[] = [];
  selectedBankCode: string = '';
  selectedStateCode: string = '';
  bankDetails: any;
  searchType: any;//string = ''; // Set default as empty string
  ifscCode: string = '';
  branchResults: any[] = [];
  ifscResults: any[] = [];
  selectedBranch: any;
  searchBranch: string = '';
  offset = 0;
  limit = 10;

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    private messageService: MessageService
  ) {
    this.stepForm = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(2)]],
      bankName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      ifscCode: ['', Validators.required],
      branch: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required],
      city: [''],
      searchBank: [''],
    });
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Initialization', command: () => this.currentStep = 0 },
      { label: 'Bank Details', command: () => this.currentStep = 1 },
      { label: 'Account Details', command: () => this.currentStep = 2 },
      { label: 'Confirmation', command: () => this.currentStep = 3 }
    ];

    this.loadBankNames();
  }

  loadBankNames() {
    this.bankAccountService.getBankNames().subscribe(bankNames => {
      this.bankNames = bankNames.map((bank: { value: any; key: any; }) => ({
        name: bank.value,
        code: bank.key
      }));
      this.filteredBankNames = [...this.bankNames];
    });
  }

  filterStates(event: any) {
    const query = event.query.toLowerCase();
    this.filteredStates = this.states.filter(state =>
      state.name.toLowerCase().includes(query)
    );
  }

  filterBanks(event: any) {
    const query = event.query.toLowerCase();
    this.filteredBankNames = this.bankNames.filter(bank =>
      bank.name.toLowerCase().includes(query)
    );
  }

  onBankSelect(event: any) {
    this.selectedBankCode = event.value.code;
    this.loadStatesForSelectedBank();
    this.stepForm.patchValue({ bankName: event.name });
  }

  loadStatesForSelectedBank() {
    this.bankAccountService.getStatesForBank(this.selectedBankCode).subscribe(response => {
      const statesArray: any = response;

      this.states = statesArray.states.map((stateName: string) => ({
        name: stateName,
        code: this.getStateCode(stateName)
      }));
  
      this.filteredStates = [...this.states];
    });
  }
  
  getStateCode(stateName: string): string {
    const stateCodeMapping: StateCodeMapping = {
      // Add state codes as needed
      "ANDAMAN AND NICOBAR ISLANDS": "IN-AN",
      "ANDRA PRADESH": "IN-AP",
      "ARUNACHAL PRADESH": "IN-AR",
      "ASSAM": "IN-AS",
      "BIHAR": "IN-BR",
      "CHANDIGARH": "IN-CH",
      "CHHATTISGARH": "IN-CT",
      "DADAR AND NAGAR HAVELI": "IN-DN",
      "DAMAN AND DIU": "IN-DD",
      "DELHI": "IN-DL",
      "GOA": "IN-GA",
      "GUJARAT": "IN-GJ",
      "HARYANA": "IN-HR",
      "HIMACHAL PRADESH": "IN-HP",
      "JAMMU AND KASHMIR": "IN-JK",
      "JHARKHAND": "IN-JH",
      "KARNATAKA": "IN-KA",
      "KERALA": "IN-KL",
      "LADAKH": "IN-LA",
      "LAKSHADWEEP ISLANDS": "IN-LD",
      "MADHYA PRADESH": "IN-MP",
      "MAHARASHTRA": "IN-MH",
      "MANIPUR": "IN-MN",
      "MEGHALAYA": "IN-ML",
      "MIZORAM": "IN-MZ",
      "NAGALAND": "IN-NL",
      "ODISHA": "IN-OR",
      "PONDICHERRY": "IN-PY",
      "PUNJAB": "IN-PB",
      "RAJASTHAN": "IN-RJ",
      "SIKKIM": "IN-SK",
      "TAMIL NADU": "IN-TN",
      "TELANGANA": "IN-TG",
      "TRIPURA": "IN-TR",
      "UTTAR PRADESH": "IN-UP",
      "UTTARAKHAND": "IN-UT",
      "WEST BENGAL": "IN-WB"
    };
    
    return stateCodeMapping[stateName] || '';
  }

  onStateSelect(event: any) {
    this.selectedStateCode = event.value.code;
    console.log(this.selectedStateCode)
    this.stepForm.patchValue({ state: event.value.name });
  }

  goToNextStep() {
    // if (this.stepForm.valid || this.currentStep === 0) {
    if(true){
      console.log("",this.searchType);
      if(this.currentStep === 0){
      this.loadBranches();}
      this.currentStep++;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  goToPreviousStep() {
    // if (this.stepForm.valid) {
    if(true){
      this.currentStep--;
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  onSubmit() {
    console.log("Came to onsub")
    if (this.stepForm.valid) {
      this.bankAccountService.saveBankAccountDetails(this.stepForm.value).subscribe(response => {
        console.log(response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Bank account details saved successfully' });
      });
    } else {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
    }
  }

  searchByIFSC() {
    if (this.ifscCode) {
      this.bankAccountService.getBankDetailsByIfsc(this.ifscCode).subscribe(data => {
        console.log(data)
        if (data) {
          this.ifscResults = [data]; // Assuming data.data is an array
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No bank details found' });
        }
      });
    }
  }

  loadBranches() {
    console.log("Came to load branches")
    this.bankAccountService.searchBranches(this.selectedBankCode, this.selectedStateCode, this.limit, this.offset)
      .subscribe(data => {
        console.log(data)
        this.branchResults = data.data || []; // Assuming data contains a data array
        if (this.branchResults.length === 0) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No branches found' });
        }
      });
  }

  onLazyLoad(event: any) {
    this.offset = event.first;
    this.limit = event.rows;
    this.loadBranches(); // Re-fetch the data with the new offset and limit
  }

  selectBank(bank: any) {
    console.log("Came to fn after click")
    console.log(bank)
    // Handle the selection of a bank from the IFSC search results
    this.stepForm.patchValue({
      bankName: bank.bankName,
      branch: bank.branch,
      city: bank.city,
      state: bank.state
    });
    this.bankDetails = bank;
  }

  selectBranch(branch: any) {
    // Handle the selection of a branch from the branch search results
    this.stepForm.patchValue({
      branch: branch.branch
    });
    this.selectedBranch = branch;
  }
}



  // searchBankDetails() {
  //   const { state, bankName } = this.stepForm.value;
  //   this.bankAccountService.searchBanks({ state, bankcode: this.selectedBankCode }).subscribe(data => {
  //     this.bankDetails = data;
  //   });
  // }