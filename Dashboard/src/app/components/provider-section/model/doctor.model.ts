export interface Doctor{
    id?: string | null,
    nameEng:string,
    nameAra:string,
    educationEng:string,
    educationAra:string,
    noOfYearEng:number,
    noOfYearAra:number,
    contantEng:string,
    contentAra:string,
    availbiltyDay:string,
    filterDate:string,
    filterTime:string,
    introEng:string,
    introAra:string,
    imageUrl: File | string;
    status:string,


}