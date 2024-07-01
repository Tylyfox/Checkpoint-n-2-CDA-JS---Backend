import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";
import { Continent } from "./continent.entity";

@ObjectType()
@Entity()
export class Country {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: false })
  @Column({ nullable: false, unique: true })
  code: string;

  @Field({ nullable: false })
  @Column({ nullable: false, unique: true })
  name: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  emoji: string;

  @Field(() => Continent)
  @ManyToOne(() => Continent, continent => continent.countries)
  continent: Continent;
}

@InputType()
export class CountryCreateInput {
  @Field({ nullable: false })
  code: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: true })
  emoji: string;

  @Field({ nullable: false })
  continentCode: string;
}
