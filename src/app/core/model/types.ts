import {TextResourceService} from "../services/text-resource-service/text-resource.service";

export type TextResourceKeys = keyof typeof TextResourceService.getText
