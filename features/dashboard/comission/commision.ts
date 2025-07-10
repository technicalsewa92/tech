interface ComissionsType {
    created_on: string;         // Date when the complaint was created
    complain_id: string;        // ID of the complaint
    call_uid: string;           // Unique ID for the call
    customer_name: string;      // Name of the customer
    customer_address: string;   // Address of the customer
    grand_total: string;        // Total amount, possibly a string since it's set to "0"
    dealer_name: string;        // Name of the dealer
    comission: string;          // Commission amount, stored as a string
  }
  