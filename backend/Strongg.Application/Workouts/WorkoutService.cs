using System.Collections.Generic;
using System.Threading.Tasks;
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

    public async Task<IReadOnlyList<Workout>> GetWorkoutsAsync()
    {
        return await _repository.GetAllAsync();
    }
}
