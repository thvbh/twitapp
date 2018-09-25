export namespace Models {

  export abstract class BaseModel {
    public static create(data: any): any {
      throw new Error('Method ' + +' not implemented');
    }
  }

  export class TwitterResponseModel extends BaseModel {
    data: any;
    resp: any;
    statusCode: any;
    message: any;
  }

  export class TweetModel extends BaseModel {
    id: string;
    creationDate: Date;
    user: UserModel;
    isRetweet: boolean;
    quotedTweet: TweetModel;
    text: string;
    retweetCount: number;
    favCount: number;
    entities: EntitiesModel;


    public static create(data: any): TweetModel {
      const model: TweetModel = new TweetModel;

      model.id = data['id_str'] !== undefined ? data['id_str'] : null;
      model.user = data['user'] !== undefined ? UserModel.create(data['user']) : null;
      model.isRetweet = data['is_quote_status'] !== undefined ? data['is_quote_status'] : false;
      model.quotedTweet = data['quoted_status'] !== undefined ? TweetModel.create(data['quoted_status']) : null;
      model.text = data['full_text'] !== undefined ? data['full_text'] : '';
      model.creationDate = data['created_at'] !== undefined ? new Date(data['created_at']) : null;
      model.retweetCount = data['retweet_count'] !== undefined ? data['retweet_count'] : null;
      model.favCount = data['favorite_count'] !==  undefined ? data['favorite_count'] : null;
      model.entities = data['entities'] !== undefined ? EntitiesModel.create(data['entities']) : null;
      return model;
    }
  }

  export class UserModel extends BaseModel {
    name: string;
    screenName: string;
    profileImage: string;
    joinDate: Date;
    description: string;
    location: string;

    public static create(data: any): UserModel {
      const model: UserModel = new UserModel;

      model.name = data['name'] !== undefined ? data['name'] : '';
      model.screenName = data['screen_name'] !== undefined ? data['screen_name'] : '';
      model.profileImage = data['profile_image_url_https'] !== undefined ? data['profile_image_url_https'] : '';
      model.joinDate = data['created_at'] !== undefined ? new Date(data['created_at']) : null;
      model.description = data['description'] !== undefined ? data['description'] : null;
      model.location = data['location'] !== undefined ? data['location'] : null;

      return model;
    }
  }

  export class EntitiesModel extends BaseModel {
    media: Array<MediaModel> = [];
    userMentions: Array<UserMentionsModel> = [];
    urls: Array<UrlModel> = [];

    public static create(data: any): EntitiesModel {
      const model: EntitiesModel = new EntitiesModel;

      const media = [];
      const userMentions = [];
      const urls = [];

      if (data['media']) {
        data['media'].forEach(item => {
          media.push(MediaModel.create(item));
        });
      }

      if (data['user_mentions']) {
        data['user_mentions'].forEach(item => {
          userMentions.push(UserMentionsModel.create(item));
        });
      }

      if (data['urls']) {
        data['urls'].forEach(item => {
          urls.push(UrlModel.create(item));
        });
      }
      model.media = media;
      model.userMentions = userMentions;
      model.urls = urls;

      return model;

    }
  }

  export class MediaModel extends BaseModel {
    id: number;
    mediaUrlHttps: string;
    url: string;
    type: MediaType;
    expandedUrl: string;
    thumb: ThumbModel;

    public static create(data: any): MediaModel {
      const model: MediaModel = new MediaModel;

      model.id = data['id'] !== undefined ? data['id'] : null;
      model.mediaUrlHttps = data['media_url_https'] !== undefined ? data['media_url_https'] : null;
      model.url = data['url'] !== undefined ? data['url'] : null;
      model.type = data['type'] !== undefined ? data['type'] : null;
      model.expandedUrl = data['expanded_url'] !== undefined ? data['expanded_url'] : null;
      model.thumb = data['sizes']['thumb'] !== undefined ? ThumbModel.create(data['sizes']['thumb']) : null;

      return model;
    }
  }

  export class UserMentionsModel extends BaseModel {
    screenName: string;
    name: string;
    id: number;

    public static create(data: any): UserMentionsModel {
      const model: UserMentionsModel = new UserMentionsModel;

      model.screenName = data['screen_name'] !== undefined ? data['screen_name'] : null;
      model.name = data['name'] !== undefined ? data['name'] : null;
      model.id = data['id'] !== undefined ? data['id'] : null;

      return model;
    }
  }

  export class UrlModel extends BaseModel {
    displayUrl: string;
    expandedUrl: string;
    url: string;

    public static create(data: any): UrlModel {
      const model: UrlModel = new UrlModel;

      model.displayUrl = data['display_url'] !== undefined ? data['display_url'] : null;
      model.expandedUrl = data['expanded_url'] !== undefined ? data['expanded_url'] : null;
      model.url = data['url'] !== undefined ? data['url'] : null;

      return model;
    }
  }

  export class ThumbModel extends BaseModel {
    width: number;
    height: number;
    resize: Resize;

    public static create(data: any): ThumbModel {
      const model: ThumbModel = new ThumbModel;

      model.width = data['w'] !== undefined ? data['w'] : null;
      model.height = data['h'] !== undefined ? data['h'] : null;
      model.resize = data['resize'] !== undefined ? data['resize'] : 'fit';

      return model;
    }
  }

  export type MediaType = 'photo' | 'video';

  export type Resize = 'fit' | 'crop';
}
