export interface IUser {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}

export interface IUserCardProps {
  user: IUser;
  onDelete: () => void;
  onEdit: () => void;
}
