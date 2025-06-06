using Strongg.Domain.Workouts;

namespace Strongg.Application.Workouts;

public class WorkoutService
{
    private readonly IWorkoutRepository _repository;

    public WorkoutService(IWorkoutRepository repository)
    {
        _repository = repository;
    }

    public Task AddWorkoutAsync(Workout workout)
    {
        return _repository.AddAsync(workout);
    }

    public Task<IReadOnlyList<Workout>> GetWorkoutsAsync()
    {
        return _repository.GetAllAsync();
    }
}
