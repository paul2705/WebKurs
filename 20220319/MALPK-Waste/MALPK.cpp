#include"MALPK.h"

MalpkHead::MalpkHead(uint8_t Version,uint8_t Server){
    _KEY=rand()%UINT8_MAX; __key=rand()%UINT8_MAX;
    _Key=_KEY^__key;
    this->Version=Version;
    this->Server=Server^__key;
    uint32_t TmpKey=(uint32_t(__key)<<24)|(uint32_t(_KEY)<<16)|(uint32_t(__key)<<8)|(uint32_t(_KEY));
    this->Len=TmpKey; 
}

bool MalpkBody::MalpkConvert(MalpkHead &_MHead){
    vector<string> DataName=_Data.getMemberNames();
    for (int i=0;i<_Data.size();i++){
        cout<<_Data[DataName[i]]<<endl;
    }
}

int main(){
    MalpkBody t;
    t._Data['yes']='no';
    t._Data['name']=1;
    //Malpk Tmp(MalpkHead(),t);
    t.MalpkConvert();
    return 0;
}