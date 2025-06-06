using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Strongg.Application.Workouts;
using Strongg.Domain.Workouts;
using Strongg.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
        policy.AllowAnyOrigin()
              .AllowAnyHeader()
              .AllowAnyMethod());
});

builder.Services.AddSingleton<IWorkoutRepository, InMemoryWorkoutRepository>();
builder.Services.AddScoped<WorkoutService>();

var app = builder.Build();

app.UseCors();

app.MapGet("/workouts", async (WorkoutService service) =>
{
    var workouts = await service.GetWorkoutsAsync();
    return Results.Ok(workouts);
});

app.MapPost("/workouts", async (WorkoutService service, WorkoutDto dto) =>
{
    var workout = new Workout(Guid.NewGuid(), dto.Date);
    foreach (var exercise in dto.Exercises)
    {
        workout.AddExercise(new Exercise(exercise.Name, exercise.Sets, exercise.Reps));
    }
    await service.AddWorkoutAsync(workout);
    return Results.Created($"/workouts/{workout.Id}", workout.Id);
});

app.Run();

record ExerciseDto(string Name, int Sets, int Reps);
record WorkoutDto(DateOnly Date, List<ExerciseDto> Exercises);
