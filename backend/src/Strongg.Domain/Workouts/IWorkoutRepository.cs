using System.Collections.Generic;
using System.Threading.Tasks;

namespace Strongg.Domain.Workouts;

public interface IWorkoutRepository
{
    Task AddAsync(Workout workout);
    Task<IReadOnlyList<Workout>> GetAllAsync();
}
