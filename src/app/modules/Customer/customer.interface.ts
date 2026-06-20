export type TCustomer = {
  name: string;
  email: string;
  phone: string;
};

export type TCustomerFilterRequest = {
  name?: string | undefined;
  email?: string | undefined;
  phone?: string | undefined;
  searchTerm?: string | undefined;
};
