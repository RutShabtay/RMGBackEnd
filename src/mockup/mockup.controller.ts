import { Controller, Post, Get } from '@nestjs/common';
import { MockupService } from './mockup.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('api')
export class MockupController {

    constructor(private readonly mockupService: MockupService) { }

    @Post('generate-mockup')
    async generateMockup(@Body('description') description: string) {
        // console.log('Received body: ');
        // console.log("Loaded API KEY:", process.env.OPENAI_API_KEY);
        // console.log('Body: ', description);

        if (!description || description.trim() === '') {
            return { error: 'Description is required😣' };
        }
        try {
            const result = await this.mockupService.generateMockup(description);
            return result;
        } catch (err) {
            console.error('Error generating mockup:', err);
            return { error: `Failed to generate mockup😣 : ${err}` };
        }
    }
}