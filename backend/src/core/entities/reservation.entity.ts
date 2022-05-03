import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Country } from './country.entity';

@Entity('reservations')
export class Reservation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name_of_guests' })
  numberOfGuests: number;

  @Column({ name: 'check_in_date' })
  checkInDate: Date;

  @Column({ name: 'check_out_date' })
  checkOutDate: Date;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'billing_address' })
  billingAddress: string;

  @ManyToOne(() => Country)
  @JoinColumn({ name: 'billing_country_id' })
  billingCountry: Country;

  @Column({ name: 'postal_code' })
  postalCode: string;

  @Column({ name: 'city' })
  city: string;

  @Column({ name: 'email' })
  email: string;

  @Column({ name: 'phone_number' })
  phoneNumber: string;
}
