export interface MyPost {
    id: string;
    title: string;
    content: string;
    username?: string | null | undefined;
    coverImage?: string | null | undefined;
}

// export interface FetchedPost {
//     id: string;
//     title: string;
//     content: string;
//     username?: string | null | undefined;
//     coverImage?: string | null | undefined;
//     owner?: string | null | undefined;
//     createdAt?: string | null | undefined;
//     updatedAt?: string | null | undefined;
//     __typename?: string | null | undefined;
// }
export interface FetchedPost {

    id: string;
    title?:  string | null | undefined;
    content?:  string | null | undefined;
    username?:  string | null | undefined ;
    coverImage?:  string | null | undefined ;
    createdAt?:  string | null | undefined;
    updatedAt?:  string | null | undefined;
    owner?: string | null | undefined;
}

export interface PostObj {
    userId: number;
    id: number;
    title: string;
    body: string;
}

  
// Define an array of MyObject type
//   let arrayOfObjects: MyObject[] = [];