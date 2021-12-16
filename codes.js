
module.exports = {
 codes: [

    ` 
    #include<bits/stdc++.h>
    using namespace std;
    int main()
    {
        int n;
        cin>> n;
        int sum=0;
        int num;
        for(int i=0;i< n ;i++)
        {
            cin>> num;
            sum+= num;
        }
    cout<< sum;
    }
    ` 
    ,
    
    `
    #include <bits/stdc++.h>

    using namespace std;

    int main()
    {
        int a1, a2, a3, b1, b2, b3;
        cin>> a1 >> a2>> a3>> b1 >> b2 >> b3;
        int x=0 , y=0;
        if(a1 > b1 )
        {
            x++;
        }else if(a1 < b1) 
        {
            y++;
        }   
        if(a2 > b2 )
        {
            x++;
        }else if(a2 < b2) 
        {
            y++;
        }   
        
        if(a3 > b3 )
        {
            x++;
        }else if(a3 < b3) 
        {
            y++;
        }   
        
        cout<< x<< " "<< y;
    }

    `
]
}
