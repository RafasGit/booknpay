const { GraphQLClient, gql, default: request } = require("graphql-request");
//import { GraphQLClient } from 'graphql-request';

const graphcmsToken = process.env.GRAPHCMS_TOKEN
const MASTER_URL ="https://api-eu-central-1-shared-euc1-02.hygraph.com/v2/" +process.env.NEXT_PUBLIC_MASTER_URL_KEY+"/master";

  const getCategory = async()=>{
    const query=gql`
    query Category {
      categories {
        bgcolor {
          hex
        }
        id
        name
        icon {
          url
        }
      }
    }
     `

     const result= await request(MASTER_URL,query)
     return result
    }
  
    const getBusinessList = async() =>{
      const query = gql`
      query BusinessList {
        businessLists {
          about
          address
          category {
            name
          }
          contactPerson
          email
          images {
            url
          }
          id
          name
        }
      }`;

      const response = await request(MASTER_URL, query);
      return response;
    };
 

    const getBusinessByCat = async (category) => {
      const query =
    gql`
    query MyQuery {
      businessLists(where: { category: { name: "` +
    category +
    `" } }) {
        about
        address
        category {
          name
        }
        contactPerson
        email
        id
        name
        images {
          url
        }
      }
    }
  `;

  const response = await request(MASTER_URL, query);
  return response;
};


const getBusinessById = async (id) => {
  const query = gql`
  query MyQuery {
    businessList(where: {id: "` + id + `"}) {
      about
      address
      category {
        name
      }
      contactPerson
      email
      id
      name
      images {
        url
      }
    }
  }
  `;
  const response = await request(MASTER_URL, query);
  return response;
};

const createNewBooking = async (
  businessId,
  date,
  time,
  userEmail,
  userName
) => {
  

  const mutationQuery =
    gql`
     mutation CreateBooking {
    createBooking(
      data: {bookingStatus: Booked, 
        businessList: {connect: {id: "` +
    businessId +
    `"}},
         date: "` +
    date +
    `", time: "` +
    time +
    `", 
         userEmail: "` +
    userEmail +
    `",
          userName: "` +
    userName +
    `"}
    ) {
      id
    }
    publishManyBookings(to: PUBLISHED) {
      count
    }
  
  }
`;
  const result = await request(MASTER_URL, mutationQuery);
  return result;
};

const businessBookedSlot = async (businessId, date) => {
  const query =
    gql`
    query BusinessBookedSlot {
      bookings(where: { businessList: { id: "` +
    businessId +
    `" }, date: "` +
    date +
    `" }) {
        date
        time
      }
    }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};

const getUserBookingHistory = async (userEmail) => {
  const query =
    gql`
  query GetUserBookingHistory {
    bookings(where: {userEmail: "` +
    userEmail +
    `"}
    orderBy: publishedAt_DESC) {
      businessList {
        name
        images {
          url
        }
        contactPerson
        address
      }
      date
      time
      id
    }
  }
  `;
  const result = await request(MASTER_URL, query);
  return result;
};


    export default{
      getCategory,
      getBusinessList,
      getBusinessByCat,
      getBusinessById,
      createNewBooking,
      businessBookedSlot,
      getUserBookingHistory
    }; 
