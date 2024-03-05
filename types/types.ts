export interface MyPost {
    id: string;
    title: string;
    content: string;
    username?: string | null | undefined;
    coverImage?: string | null | undefined;
}

export interface PostObj {
    userId: number;
    id: number;
    title: string;
    body: string;
}

  
// Define an array of MyObject type
//   let arrayOfObjects: MyObject[] = [];