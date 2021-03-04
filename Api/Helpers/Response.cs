using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Helpers
{
    public class Response
    {
        [JsonProperty(PropertyName = "IsSuccess")]
        public bool IsSuccess { get; set; }
        [JsonProperty(PropertyName = "Message")]
        public string Message { get; set; }
        [JsonProperty(PropertyName = "Result")]
        public object Result { get; set; }
        [JsonProperty(PropertyName = "ArchiveBase64")]
        public string ArchiveBase64 { get; set; }
    }
}
