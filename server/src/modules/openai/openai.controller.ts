import { Request, Response } from "express";
import { HTTPSTATUS } from "../../config/http.config";
import { asyncHandler } from "../../middlewares/asyncHandler";
import { OpenAIService } from "./openai.service";



export class OpenAIController {
    private openAIService: OpenAIService;


constructor(openAIService: OpenAIService) {
    this.openAIService = openAIService;
}

public runPrompt = asyncHandler(
    async (req: Request, res: Response): Promise<any> => {
        
        
        const response = await this.openAIService.runPrompt(req.params.submission);
        
        return res
        .status(HTTPSTATUS.CREATED)
        .json({message: response,
        });
    }
)

  
}