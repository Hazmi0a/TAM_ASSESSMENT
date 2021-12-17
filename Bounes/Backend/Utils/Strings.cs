using System;
namespace Backend.Utils
{
    public static class Strings
    {
        public const string NoResouces = "No resources exists";

        public const string ListingResources = "Listing resourses";
        public const string CreateResourse = "Creating new resourse";
        public const string CreateListResourse = "Creating list of new resourses";

        public static string UpdateResourse(int id) => $"Updating resourse {id}";
        public static string DeleteResourse(int id) => $"Deleting resourse {id}";


        public static string GettingResource(Guid id, bool exist = true)
        {
            if (exist) return $"Getting resourse {id}";
            return $"Get({id}) NOT FOUND";
        }
        public static string GettingResource(int id, bool exist = true)
        {
            if (exist) return $"Getting resourse {id}";
            return $"Get({id}) NOT FOUND";
        } 
        public static string GettingResource(string id, bool exist = true)
        {
            if (exist) return $"Getting resourse {id}";
            return $"Get({id}) NOT FOUND";
        }

        public const string SetCacheRecord = "Setting new record to cache";


        // Players Positions
        public const string GK = "Goalkeeper";
        public const string DF = "Defender";
        public const string MD = "Midfielder";
        public const string FW = "Attacker";
    }
}