export const URL_API = `https://api.spacex.land/graphql/`;

export const GET_DATA_QUERY = `{
    launchesPast(limit:20) {
      links {
        video_link
      }
      id
      launch_date_local
      mission_name
      rocket {
        rocket_name
      }
    }
  }
  
  
  `;
