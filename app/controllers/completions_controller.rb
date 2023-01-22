class CompletionsController < ApplicationController

  before_action :logged_in?, only:[:generate_completion]

    def index
        completions = Completion.all
        render json: completions
    end

    def show
      completion = find_completion
      render json: completion
    end
    
    def generate_completion
        all_completions = []
        model = "text-davinci-003"
        prompt = 'Generate a course syllabus of nine lessons for'+ params[:topic] +'such that I would have a basic understanding of the topic upon completion of the course.
        Separate the course into three sections of three lessons.
        Include a real and, to the best of your knowledge active link to a youtube video that covers the topic for each lesson.
        Format the syllabus in the following way:
        Title: `Course Title`
        Section 1:
        Lesson A: 
        Name: `Lesson Name`
        Subject: `Lesson Subject`
        Video: `Youtube video title`
        Channel: `Youtube video Channel`
        Link: `Youtube Video Link`
        (Continue with lessons B and C for each section)(ONLY write "Sections" and "Lessons" as "Section 1:", "Lesson A:", etc, DO NOT include any further text to the line upon which those important keywords appear.)
        Repeat this formatting for all the sections and lessons for'+params[:topic]+'
        If more subject matter is required in order to have a basic understanding of' + params[:topic]+',
        Include a final section labled "Section 4" with any relevent information you think is nessecary for a complete basic understanding of' + params[:topic]+'.
        Please follow the requested formatting exactly as it appears. Thank you.'
        client = OpenAI::Client.new
        completions = client.completions(
          parameters: {
            model: model,
            prompt: prompt,
            max_tokens: 2048
          }
        )
        usage = completions["usage"]["prompt_tokens"]
        lines = completions["choices"][0]["text"].split("\n")
        
        completion = Completion.create(prompt: prompt, text: completions["choices"][0]["text"], topic: params[:topic], prompt_tokens: completions["usage"]["prompt_tokens"], completion_tokens: completions["usage"]["completion_tokens"], total_tokens: completions["usage"]["total_tokens"] )
        
        course = Completion.generate_course_from_completion(completion.parse_completion, current_user.id, params[:topic])
        render json: course

    end

    def generate_lesson
      binding.pry
      model = "text-davinci-003"
        prompt = 'Write the text for a lesson in and online course on '+ params["topic"] +' on the topic of '+ params["lesson_name"]+', make sure to completely cover everything that goes into'+ params["subject"] +'. Do not add any qualifying statements such as "welcome" or "congratulations" simply provide the lesson text in a detached and emperical voice.'
        
        client = OpenAI::Client.new
        completions = client.completions(
          parameters: {
            model: model,
            prompt: prompt,
            max_tokens: 2048
          }
        )
        usage = completions["usage"]["prompt_tokens"].class
        lines = completions["choices"][0]["text"].split("\n")
        
        completion = Completion.create(prompt: prompt, text: completions["choices"][0]["text"].split("\n").compact_blank.join(" "), topic: params[:topic], prompt_tokens: completions["usage"]["prompt_tokens"], completion_tokens: completions["usage"]["completion_tokens"], total_tokens: completions["usage"]["total_tokens"] )

        lesson = Lesson.find(params[:id])
        lesson.update(text: completion.text)
        render json: lesson
    end



    private

    def find_completion
      completion = Completion.find(params[:id])
    end

end
