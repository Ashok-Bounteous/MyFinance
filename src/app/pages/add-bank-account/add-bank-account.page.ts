import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
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
  // bankDetails: any;
  searchType: any = 'ifsc';//string = ''; // Set default as empty string
  ifscCode: string = '';
  branchResults: any[] = [];
  branchDetails: {
    BANK: string;
    BANKCODE: string;
    BRANCH: string;
    ADDRESS: string;
    CITY: string;
    DISTRICT: string;
    STATE: string;
    IFSC: string;
    CONTACT: string;
    MICR: string;
    SWIFT: string | null;
    IMPS: boolean;
    NEFT: boolean;
    RTGS: boolean;
    UPI: boolean;
  } | null = null;
  ifscResults: any[] = [];
  selectedBranch: any;
  searchBranch: string = '';
  offset = 0;
  limit = 10;
  totalRecords: number = 0;
  activeIndex: number = 0;
  
  // onActiveIndexChange(event: number) {
  //     this.activeIndex = event;
  // }

  constructor(
    private fb: FormBuilder,
    private bankAccountService: BankAccountService,
    private messageService: MessageService,
    private toastController: ToastController 
  ) {
    this.stepForm = this.fb.group({
      accountName: ['', [Validators.required, Validators.minLength(2)]],
      bankName: ['', Validators.required],
      accountNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      ifscCode: ['', Validators.required],
      branch: ['', [Validators.required, Validators.minLength(2)]],
      state: ['', Validators.required],
      city: [''],
      currentBalance: ['', [Validators.required, Validators.min(0)]], // Added currentBalance field
      bank: ['']
    });
  }

  ngOnInit(): void {
    this.items = [
      { label: 'Initial', command: () => {this.currentStep = 0; this.activeIndex=0} },
      { label: 'Bank Info', command: () => {this.currentStep = 1; this.activeIndex=1} },
      { label: 'Account Info', command: () => {this.currentStep = 2; this.activeIndex=2} },
      { label: 'Confirm', command: () => {this.currentStep = 3; this.activeIndex=3} }
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

  // goToNextStep() {
  //   // if (this.stepForm.valid || this.currentStep === 0) {
  //   if(true){
  //     console.log("",this.searchType);
  //     if(this.currentStep === 0){
  //     this.loadBranches();}
  //     this.currentStep++;
  //   } else {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
  //   }
  // }

  // goToPreviousStep() {
  //   // if (this.stepForm.valid) {
  //   if(true){
  //     this.currentStep--;
  //   } else {
  //     this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please fill all required fields' });
  //   }
  // }

  goToNextStep() {
    if (this.currentStep === 0 && this.isStepValid()) {
      this.currentStep++;
      this.activeIndex++;
      this.loadBranches();
    } else if (this.currentStep === 1 && this.isStepValid()) {
      this.currentStep++;
      this.activeIndex++;
    } else if (this.currentStep === 2 && this.isStepValid()) {
      this.currentStep++;
      this.activeIndex++;
    }
  }

  goToPreviousStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.activeIndex--;
    }
  }

  isStepValid(): boolean {
    if (this.currentStep === 0) {
      return !!this.selectedBankCode && !!this.selectedStateCode && !!this.searchType;
    } else if (this.currentStep === 1) {
      if (this.searchType === 'ifsc') {
        return !!this.ifscCode;
      } else if (this.searchType === 'search') {
        return !!this.selectedBranch;
      }
    } else if (this.currentStep === 2) {
      return this.stepForm.valid;
    }
    return true;
  }

  onActiveIndexChange(event: number) {
    if (event < this.activeIndex) {
      this.goToPreviousStep();
    } else if (event > this.activeIndex && this.isStepValid()) {
      this.goToNextStep();
    }
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Bank account details saved successfully',
      duration: 2000, // Duration in milliseconds
      position: 'top'
    });
    toast.present();
  }
  
  onSubmit() {
    console.log("Came to onsub");
    
    if (this.stepForm.valid) {
      this.bankAccountService.saveBankAccountDetails(this.stepForm.value).subscribe(response => {
        console.log(response);
  
        // Show success toast
        this.presentToast();
  
        // Reset the form and navigate to the first step
        this.stepForm.reset();
        this.selectedBankCode = '';
        this.selectedStateCode = '';
        this.searchType = '';
        this.branchDetails = null;
        this.currentStep = 0;
        this.activeIndex = 0;
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

  onLazyLoad(event: any) {
    console.log(event);
    this.offset = event.first;
    this.limit = event.rows;
    this.loadBranches(); // Fetch data based on the current offset and limit
  }

  loadBranches() {
    this.bankAccountService.searchBranches(this.selectedBankCode, this.selectedStateCode, this.limit, this.offset)
      .subscribe({
        next: (data) => {
          console.log(data);
          this.branchResults = data.data || [];
          this.totalRecords = data.count; // Total number of records in the backend
          if (this.branchResults.length === 0) {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No branches found' });
          }
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to load branches' });
        }
      });
  }
  

  selectBank(bank: any) {
    console.log("Came to fn after click");
    console.log(bank);
  
    // Handle the selection of a bank from the IFSC search results
    this.stepForm.patchValue({
      bankName: bank.BANK, // Adjusted to match the correct key in the bank object
      branch: bank.BRANCH,
      city: bank.CITY,
      state: bank.STATE,
      ifscCode: bank.IFSC,
      bank: bank
    });
  
    this.branchDetails = bank;
    console.log(this.branchDetails);
    console.log(this.stepForm);
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