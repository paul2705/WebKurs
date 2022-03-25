#ifndef _MALPK_H_
    #include<cmath>
    #include"sys/time.h"
    #include<json/json.h>
    #include<arpa/inet.h>
    #include<vector>
    #include<string>

    #define UINT8_MAX 255
    #define UINT32_MAX 4294967295

    struct MalpkHead{
        uint8_t Version,Server;
        uint8_t _KEY,_Key,__key;
        uint32_t Len;
        MalpkHead(uint8_t Version=1,uint8_t Server=1);
    };
    struct MalpkBody{
        string DATA;
        Json::value _Data;
        bool MalpkConvert(MalpkHead &_MHead);
    };

    struct Malpk{
        MalpkHead MHead;
        MalpkBody MBody;
        Malpk(MalpkHead &MHead,MalpkBody &MBody);
    };

    class MalpkEnCode{
        private:
            MalpkEnHead(uint8_t *_p,uint8_t );
    };


	struct timeval tv;
	struct timezone tz;
	gettimeofday(&tv,&tz);
	srand(tv.tv_sec*1000000+tv.tv_usec);
#endif