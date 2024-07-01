import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Field, InputType, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Country {
  @Field()
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field({ nullable: false })
  @Column({nullable: false})
  code: string;

  @Field({nullable: false})
  @Column({nullable: false})
  name: string;

  @Field({nullable: true})
  @Column({nullable: true})
  emoji: string;

  @Field({nullable: false})
  @Column({nullable: false})
  continentCode: string;
}

@InputType()
export class CountryCreateInput {
  @Field({nullable: false})
  code: string;

  @Field({nullable: false})
  name: string;

  @Field({nullable: true})
  emoji: string;

  @Field({nullable: false})
  continentCode: string;
}