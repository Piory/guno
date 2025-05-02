import { faker } from '@faker-js/faker';
import { VUserDetails } from '@core/domain';

export const fakeVUserDetail = (): VUserDetails => {
  return {
    user_id: faker.string.uuid(),
    screen_name: faker.string.ulid(),
    display_name: faker.lorem.sentence(),
    avatar_url: faker.image.avatar(),
    self_introduction: faker.lorem.paragraph(),
    latest_posts: {},
    favorite_posts: {},
    follow_count: faker.number.int(),
    follower_count: faker.number.int(),
    created_at: faker.date.anytime().toISOString(),
    updated_at: faker.date.anytime().toISOString(),
    deleted_at: faker.date.anytime().toISOString(),
  };
};
