import { Controller, Post, Get, HttpException, HttpStatus } from '@nestjs/common';
import { MockupService } from './mockup.service';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Controller('api')
export class MockupController {

    constructor(private readonly mockupService: MockupService) { }

    @Post('generate-mockup')
    async generateMockup(@Body('description') description: string) {

        if (!description || description.trim() === '') {
            return { error: 'Description is required😣' };
        }
        try {
            const result = await this.mockupService.generateMockup(description);
            return result;
        } catch (err) {
            console.error('Error generating mockup:', err);
            throw new HttpException(err.message || `Failed to generate mockup😣 : ${err}`, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}