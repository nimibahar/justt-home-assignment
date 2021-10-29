import { Customer } from "../model";

export const DEFAULT_MERCHANT_CUSTOMER_ID = "813-86-3131"

const seedData = [
  {
    merchant_customer_id: DEFAULT_MERCHANT_CUSTOMER_ID,
    first_name: "Benedikt",
    last_name: "Abberley",
    email: "babberley0@artisteer.com",
    gender: "Male",
    country: "Nicaragua",
    city: "San Jorge",
    street: "415 Green Lane",
    phone: "887-564-6105",
  },
  {
    merchant_customer_id: "387-63-2772",
    first_name: "Ellwood",
    last_name: "Speirs",
    email: "espeirs1@mediafire.com",
    gender: "Male",
    country: "Indonesia",
    city: "Kiarajangkung",
    street: "4368 Sloan Trail",
    phone: "660-819-9883",
  },
  {
    merchant_customer_id: "500-47-2929",
    first_name: "Gray",
    last_name: "Slucock",
    email: "gslucock2@wufoo.com",
    gender: "Male",
    country: "Cuba",
    city: "Vertientes",
    street: "01195 Laurel Drive",
    phone: "689-147-8731",
  },
  {
    merchant_customer_id: "183-06-7195",
    first_name: "Felicia",
    last_name: "Starbucke",
    email: "fstarbucke3@mashable.com",
    gender: "Female",
    country: "China",
    city: "Shijing",
    street: "90119 Grasskamp Parkway",
    phone: "312-874-7275",
  },
  {
    merchant_customer_id: "249-75-0095",
    first_name: "Ewell",
    last_name: "Hazzard",
    email: "ehazzard4@istockphoto.com",
    gender: "Male",
    country: "Cyprus",
    city: "Kíti",
    street: "45987 8th Road",
    phone: "479-392-7059",
  },
  {
    merchant_customer_id: "361-48-2924",
    first_name: "Kristoffer",
    last_name: "Portwain",
    email: "kportwain5@mashable.com",
    gender: "Male",
    country: "Afghanistan",
    city: "Shahrak",
    street: "3 Hallows Point",
    phone: "979-372-3737",
  },
  {
    merchant_customer_id: "138-07-4256",
    first_name: "Vivian",
    last_name: "Everleigh",
    email: "veverleigh6@deviantart.com",
    gender: "Female",
    country: "Uzbekistan",
    city: "Navoiy",
    street: "5496 Welch Junction",
    phone: "981-908-1763",
  },
]

export const seedCustomerData = async () => {
  try {
    const customers = await Customer.find({});

    if (customers?.length) {
      console.log('Customers found. no seed needed');
      return;
    }

    const seedResult = await Customer.insertMany(seedData);
    console.log('Seed succeeded. Result', seedResult);

  } catch (error) {
    console.error(`failed to seed customers ${error}`);
  }
}