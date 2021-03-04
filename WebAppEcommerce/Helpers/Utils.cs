using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace WebAppEcommerce.Helpers
{
    public static class Utils
    {

        // Enumerable.Range(1,1000000).Select(x=>GetFormNumber()).GroupBy(x => x).Where(x=>x.Count()>1).Dump();
        public static int GetUniqueNumber()
        {
            System.Threading.Thread.Sleep(1);
            var now = DateTime.Now;
            var zeroDate = DateTime.MinValue.AddHours(now.Hour).AddMinutes(now.Minute).AddSeconds(now.Second).AddMilliseconds(now.Millisecond);
            return (int)(zeroDate.Ticks / 10000);

        }
    }
}
