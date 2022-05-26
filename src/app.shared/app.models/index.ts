export interface JournalRepresentativeProfile {
    id: number;
    identityDocumentLink: string;
    governmentId: string;
    representedLegalEntity: string;
    legalEntityPhoneNumber: string;
    legalEntityEmail: string;
    phoneNumber: string;
    users: User;
    userId: number;
}

export interface Role {
    id: number;
    roleId: string;
    description: string;
    users: Array<User>;
}

export interface User {
    id: number;
    email: string;
    password: string;
    banned: boolean;
    banReason: string;
    roles: Array<Role>;
    profileId: number;
    journalRepresentativeProfileId: JournalRepresentativeProfile;
}

export interface Profile {
    id: number;
    firstName: string;
    lastName: string;
    birthDate: string;
    country: string;
    region: string;
    address: string;
    user: User;
}

export interface Journal {
    id: number;
    name: string;
    description: string;
    journalRepresentativeProfileId: number;
    status: string;
    authors: Array<Author>;
    publications: Array<Publication>;
}

export interface Publication {
    id: number;
    title: string;
    description: string;
    link: string;
    status: string;
    authors: Array<Author>;
    journals: Journal;
    journalId: number;
}

export interface Author {
    id: number;
    profileId: number;
    profile: Profile;
    status: string;
    bio: string;
    publications: Array<Publication>;
    journals: Array<Journal>;
}

export interface AuthorCreateDto {
    profileId: number;
    status: string;
    bio: string;
}